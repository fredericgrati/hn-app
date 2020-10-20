import { memo } from "react";
import { TOP, NEW } from "../hooks/useHNStories";

function Nav(props) {
  return (
    <div className="flex bg-orange-500">
      <img src="/icon.gif"></img>
      <p onClick={() => props.onTypeChange(TOP)}>top</p> |{" "}
      <p onClick={() => props.onTypeChange(NEW)}>new</p>
    </div>
  );
}

export default memo(Nav);
