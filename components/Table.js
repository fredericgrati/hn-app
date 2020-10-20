import { memo } from "react";
import style from "../styles/Table.module.css";

function Table({ stories, onVote, onHide }) {
  return (
    <div>
      <ul>
        {stories
          .filter((story) => !story.hide)
          .map((story, index) => {
            const bgc = index % 2 === 0 ? style.even : style.odd;
            return (
              <li className={bgc} key={story.id}>
                <div className="flex items-center">
                  <div className="flex sm:w-18 md:w-24">
                    <div className="w-6 text-right">{story.nbComment}</div>
                    <div className="w-6 text-right">
                      {story.points + story.ownPoints}
                    </div>
                    <div className="w-6">
                      <div
                        className={style.arrow}
                        title="upvote"
                        onClick={() => onVote(story.id)}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap text-sm truncate xl:flex-no-wrap">
                    <p className="text-lg truncate">{story.title}&nbsp;</p>
                    <div className="flex items-center">
                      <span className={style.domainText}>({story.domain})</span>
                      <span className={style.byText}>&nbsp;by&nbsp;</span>
                      {story.author}
                      <span className={style.domainText}>
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

export default memo(Table);
