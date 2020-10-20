import { memo } from "react";
import { TOP, NEW } from "../hooks/useHNStories";
import styles from "../styles/Nav.module.css";

function Nav(props) {
  return (
    <div className={`${styles.header} flex items-center h-8`}>
      <img
        width="25"
        height="25"
        className="m-2 border border-white"
        src="/icon.gif"
      />
      <p onClick={() => props.onTypeChange(TOP)}>top</p>
      &nbsp; |&nbsp;<p onClick={() => props.onTypeChange(NEW)}>new</p>
    </div>
  );
}

export default memo(Nav);
