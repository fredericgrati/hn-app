import "react";
import ChartistGraph from "react-chartist";

function LineChart({ stories }) {
  const data = {
    labels: stories.map((story) => story.id),
    series: [stories.map((story) => story.points + story.ownPoints)],
  };

  const type = "Line";

  const options = {
    fullWidth: true,
    chartPadding: {
      right: 40,
    },
  };

  return (
    <div className="h-64 mt-12">
      <ChartistGraph data={data} options={options} type={type} />
    </div>
  );
}

export default LineChart;
