import "react";
import PropTypes from "prop-types";
import ChartistGraph from "react-chartist";

import { StoryPropType } from "../hooks/useHNStories";

export function getData(stories) {
  const visibleStories = stories.filter((story) => !story.hide);
  return {
    labels: visibleStories.map((story) => story.id),
    series: [visibleStories.map((story) => story.points + story.ownPoints)],
  };
}

function LineChart({ stories }) {
  const data = getData(stories);

  const options = {
    fullWidth: true,
    chartPadding: {
      right: 40,
    },
  };

  return (
    <div className="h-64 mt-12">
      <ChartistGraph data={data} options={options} type="Line" />
    </div>
  );
}

LineChart.propTypes = {
  stories: PropTypes.arrayOf(StoryPropType),
};

export default LineChart;
