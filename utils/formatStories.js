import dayjs from "dayjs";

function formatStories(stories, lsStories = {}) {
  return stories.hits.map((story) => {
    const id = story.objectID;
    const url = new URL(
      story.url || `https://news.ycombinator.com/item?id=${id}`
    );
    const ownPoints = lsStories[id] ? lsStories[id].ownPoints : 0;
    const hide = lsStories[id] ? lsStories[id].hide : 0;
    return {
      id,
      createdAt: dayjs().from(dayjs(story.created_at)),
      title: story.title,
      url: story.url,
      author: story.author,
      points: story.points,
      domain: url.hostname.replace("www.", ""),
      nbComment: story.num_comments,
      hide,
      ownPoints,
    };
  });
}

export default formatStories;