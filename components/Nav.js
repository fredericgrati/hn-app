import { memo } from "react";
import PropTypes from "prop-types";

import { TOP, NEW } from "../hooks/useHNStories";

function Nav(props) {
  return (
    <div
      className={`flex items-center h-8`}
      style={{ backgroundColor: "#ff6601" }}
    >
      <img alt="icon" width="24" height="24" src="/logo.png" />
      <div className="flex items-center ml-2">
        <p
          className={`${props.type === TOP ? "text-white" : ""} cursor-pointer`}
          onClick={() => props.onTypeChange(TOP)}
        >
          top
        </p>
        &nbsp;|&nbsp;
        <p
          className={`${props.type === NEW ? "text-white" : ""} cursor-pointer`}
          onClick={() => props.onTypeChange(NEW)}
        >
          new
        </p>
      </div>
    </div>
  );
}

Nav.propTypes = {
  type: PropTypes.string.isRequired,
  onTypeChange: PropTypes.func.isRequired,
};

export default memo(Nav);
