import "react";

function More(props) {
  if (props.loading) {
    return <p>Loading</p>;
  }
  return <p onClick={props.onFetch}>More</p>;
}

export default More;
