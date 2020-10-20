import fetcher from "../utils/fetcher";

export async function getTopStories(page = 0, nbStories = 30) {
  const storyIds = await fetcher(
    `https://hacker-news.firebaseio.com/v0/topstories.json`
  );
  const stories = await fetcher(
    `https://hn.algolia.com/api/v1/search?tags=story,(${storyIds
      .slice(nbStories * page, nbStories)
      .map((id) => `story_${id}`)})`
  );
  return stories;
}

export async function getNewestStories(page = 0, nbStories = 30) {
  try {
    const stories = await fetcher(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}&hitsPerPage=${nbStories}`
    );
    return stories;
  } catch (e) {
    console.error(e);
    return { hits: [] };
  }
}

export async function getServerSideStories() {
  const stories = await getNewestStories();
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
