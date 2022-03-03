import { render } from "@testing-library/react";
import Autocomplete from "../../components/Autocomplete";

describe("Autocomplete Component", () => {
  it("should render the Autocomplete component", () => {
    const { getByTestId } = render(
      <Autocomplete options={[]} onChange={() => {}} defaultValue={null} />
    );

    expect(getByTestId("auto-complete")).toBeInTheDocument();
  });
});
