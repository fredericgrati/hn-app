import { memo } from "react";

function Table({ stories, onVote, onHide }) {
  return (
    <div>
      <ul>
        {stories
          .filter((story) => !story.hide)
          .map((story, index) => {
            const bgc = index % 2 === 0 ? "bg-orange-200" : "bg-orange-500";
            return (
              <li className={bgc} key={story.id}>
                <div className="flex">
                  {story.nbComment} {story.points + story.ownPoints} [
                  <p onClick={() => onVote(story.id)}>vote</p>] {story.title} (
                  {story.domain}) by {story.author} {story.createdAt} [
                  <p onClick={() => onHide(story.id)}>hide</p>]
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default memo(Table);
