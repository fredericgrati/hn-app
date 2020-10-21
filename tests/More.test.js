import { render, screen } from "@testing-library/react";
import More from "../components/More";

describe("More", () => {
  it("Show Loading when is Loading", () => {
    render(<More loading onFetch={() => ({})} />);
    screen.getByText("Loading");
  });
  it("Show More when is not Loading", () => {
    render(<More loading={false} onFetch={() => ({})} />);
    screen.getByText("More");
  });
});
