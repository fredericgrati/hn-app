import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

import useLocalStorage from "./useLocalStorage";
import useIsMounted from "./useIsMounted";

import * as storiesApi from "../api/stories";
import formatStories from "../utils/formatStories";

export const NEW = "NEW";
export const TOP = "TOP";

function useHNStories(ssStories = {}) {
  const [stories, setStories] = useState(() => formatStories(ssStories));
  const [type, setType] = useState(TOP);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lsStories, setLsStories] = useLocalStorage("stories");
  const isMounted = useIsMounted();

  const fetchStories = async () => {
    setLoading(true);
    const fn =
      type === NEW ? storiesApi.getNewestStories : storiesApi.getTopStories;
    const s = await fn(page);
    setLoading(false);
    const formattedStories = formatStories(s, lsStories);
    setStories(formattedStories);
  };

  // When page change then fetch stories
  useEffect(() => {
    // avoid first fetch (already fetched from server)
    if (isMounted) {
      fetchStories();
    }
  }, [page, type]);

  // When Stories changed then save them into local storage
  useEffect(() => {
    // array to object
    const storiesById = stories.reduce((res, story) => {
      res[story.id] = story;
      return res;
    }, {});
    setLsStories({ ...lsStories, ...storiesById });
  }, [stories]);

  // When mounted then format and save server side stories
  useEffect(() => {
    const formattedStories = formatStories(ssStories, lsStories);
    setStories(formattedStories);
  }, []);

  function onFetch() {
    setPage(page + 1);
  }

  function onTypeChange(type) {
    setPage(0);
    setType(type);
  }

  async function onVote(id) {
    const selectedStory = stories.find((story) => story.id === id);
    if (!selectedStory) {
      return;
    }
    const updatedStory = await storiesApi.onVote(selectedStory);
    setStories(
      stories.map((story) => {
        if (story.id === id) {
          return updatedStory;
        }
        return story;
      })
    );
  }

  async function onHide(id) {
    const selectedStory = stories.find((story) => story.id === id);
    if (!selectedStory) {
      return;
    }
    const updatedStory = await storiesApi.onHide(selectedStory);
    setStories(
      stories.map((story) => {
        if (story.id === id) {
          return updatedStory;
        }
        return story;
      })
    );
  }

  return [
    {
      type,
      loading,
      data: stories,
    },
    {
      onHide: useCallback(onHide, [stories]),
      onFetch: useCallback(onFetch, [page]),
      onVote: useCallback(onVote, [stories]),
      onTypeChange: useCallback(onTypeChange, [type]),
    },
  ];
}

export const StoryPropType = PropTypes.shape({
  id: PropTypes.string,
  createdAt: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  author: PropTypes.string,
  points: PropTypes.number,
  domain: PropTypes.string,
  nbComment: PropTypes.number,
  hide: PropTypes.bool,
  ownPoints: PropTypes.number,
});

export default useHNStories;
