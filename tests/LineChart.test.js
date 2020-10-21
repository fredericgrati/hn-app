import { render, screen } from "@testing-library/react";
import { getData } from "../components/LineChart";

describe("LineChart", () => {
  it("getData filter only visible stories", () => {
    const stories = [
      { id: 1, points: 10, ownPoints: 0, hide: false },
      { id: 2, points: 2, ownPoints: 2, hide: true },
    ];
    const result = getData(stories);
    expect(result).toHaveProperty("labels", [1]);
    expect(result).toHaveProperty("series", [[10]]);
  });
});
