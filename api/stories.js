import fetcher from "../utils/fetcher";

export async function getTopStories(page = 0, nbStories = 30) {
  try {
    const storyIds = await fetcher(
      `https://hacker-news.firebaseio.com/v0/topstories.json`
    );
    const selectedStoryIds = storyIds.slice(
      nbStories * page,
      nbStories * page + nbStories
    );
    const stories = await fetcher(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story,(${selectedStoryIds.map(
        (id) => `story_${id}`
      )})&hitsPerPage=${nbStories}`
    );
    return {
      ...stories,
      hits: stories.hits.sort(function (a, b) {
        return (
          selectedStoryIds.indexOf(parseInt(a.objectID)) -
          selectedStoryIds.indexOf(parseInt(b.objectID))
        );
      }),
    };
  } catch (e) {
    console.error(`Oups, an error occured while fetching stories`);
    return { hits: [] };
  }
}

export async function getNewestStories(page = 0, nbStories = 30) {
  try {
    const stories = await fetcher(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}&hitsPerPage=${nbStories}`
    );
    return stories;
  } catch (e) {
    console.error(`Oups, an error occured while fetching stories`);
    return { hits: [] };
  }
}

export async function getServerSideStories() {
  const stories = await getTopStories();
  return {
    props: { stories },
  };
}

export async function onVote(story) {
  const MAX_VOTE = 10;

  if (story.ownPoints < MAX_VOTE) {
    story.ownPoints += 1;
  }
  return story;
}

export async function onHide(story) {
  story.hide = true;
  return story;
}
