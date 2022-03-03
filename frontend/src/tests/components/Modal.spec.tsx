import { render } from "@testing-library/react";
import Modal from "../../components/Modal";

describe("Modal Component", () => {
  it("should render the Modal components", () => {
    const { getByTestId } = render(
      <Modal open={true} handleClose={() => {}} />
    );

    expect(getByTestId("modal")).toBeInTheDocument();
  });

  it("should not render the Modal component", () => {
    const { queryByTestId } = render(
      <Modal open={false} handleClose={() => {}} />
    );

    expect(queryByTestId("modal")).not.toBeInTheDocument();
  });
});
