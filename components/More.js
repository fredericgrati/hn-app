import { memo } from "react";
import PropTypes from "prop-types";

function More(props) {
  const Button = props.loading ? (
    <span className="text-lg ">Loading</span>
  ) : (
    <span
      className="text-lg text-orange-500 cursor-pointer "
      onClick={props.onFetch}
    >
      More
    </span>
  );
  return <div className="p-2">{Button}</div>;
}

More.propTypes = {
  loading: PropTypes.bool.isRequired,
  onFetch: PropTypes.func.isRequired,
};

export default memo(More);
