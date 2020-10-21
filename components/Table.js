import { memo } from "react";
import PropTypes from "prop-types";

import { StoryPropType } from "../hooks/useHNStories";

function Table({ stories, onVote, onHide }) {
  return (
    <div>
      <ul>
        {stories
          .filter((story) => !story.hide)
          .map((story, index) => {
            const bgc = index % 2 === 0 ? "#e6e6e0" : "#f6f6f0";
            return (
              <li key={story.id} style={{ backgroundColor: bgc }}>
                <div className="flex items-center">
                  <div className="flex w-32">
                    <div className="w-10 text-right">{story.nbComment}</div>
                    <div className="w-10 text-right">
                      {story.points + story.ownPoints}
                    </div>
                    <div className="flex items-center justify-center w-10">
                      <img
                        className="cursor-pointer"
                        onClick={() => onVote(story.id)}
                        alt="icon"
                        width="13"
                        height="13"
                        src="/arrow.svg"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap text-sm truncate xl:flex-no-wrap">
                    <p className="text-lg truncate">{story.title}&nbsp;</p>
                    <div className="flex items-center">
                      <span style={{ color: "#828282" }}>({story.domain})</span>
                      <span style={{ color: "#b8b8b8" }}>&nbsp;by&nbsp;</span>
                      {story.author}
                      <span style={{ color: "#828282" }}>
                        &nbsp;{story.createdAt}
                      </span>
                      &nbsp;[
                      <span
                        className="cursor-pointer"
                        onClick={() => onHide(story.id)}
                      >
                        hide
                      </span>
                      ]
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

Table.propTypes = {
  stories: PropTypes.arrayOf(StoryPropType),
  onVote: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default memo(Table);
