import { render } from "@testing-library/react";
import LoadingScreen from "../../components/LoadingScreen";

describe("LoadingScreen Component", () => {
  it("should render a loading spinner", () => {
    const { getByTestId } = render(<LoadingScreen />);

    expect(getByTestId("loader")).toBeInTheDocument();
  });
});
