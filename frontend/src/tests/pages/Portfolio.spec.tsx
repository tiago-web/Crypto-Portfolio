import { render } from "@testing-library/react";
import Portfolio from "../../pages/Portfolio";
import { mocked } from "jest-mock";
import { useFetchAvailableTokens } from "../../hooks/useFetchAvailableTokens";

jest.mock("../../hooks/useFetchAvailableTokens");

jest.mock("../../hooks/useFetchPortfolioTokens", () => ({
  useFetchPortfolioTokens: jest.fn().mockImplementation(() => ({
    portfolioTokens: undefined,
    isFetchingPortfolioTokens: false,
    isRefetching: false,
  })),
}));

jest.mock("notistack", () => ({
  useSnackbar() {
    return { enqueueSnackbar: jest.fn() };
  },
}));

describe("Portfolio Component", () => {
  it("should render the Toolbar component", () => {
    const useFetchAvailableTokensMocked = mocked(useFetchAvailableTokens);

    useFetchAvailableTokensMocked.mockReturnValue({
      availableTokens: undefined,
      isFetchingAvailableTokens: false,
    });

    const { getByTestId } = render(<Portfolio />);

    expect(getByTestId("toolbar")).toBeInTheDocument();
  });

  it("should render the Table component", () => {
    const useFetchAvailableTokensMocked = mocked(useFetchAvailableTokens);

    useFetchAvailableTokensMocked.mockReturnValue({
      availableTokens: undefined,
      isFetchingAvailableTokens: false,
    });

    const { getByTestId } = render(<Portfolio />);

    expect(getByTestId("table")).toBeDefined();
  });

  it("should render a loading spinner", () => {
    const useFetchAvailableTokensMocked = mocked(useFetchAvailableTokens);

    useFetchAvailableTokensMocked.mockReturnValue({
      availableTokens: undefined,
      isFetchingAvailableTokens: true,
    });
    const { getByTestId } = render(<Portfolio />);

    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("should not render a loading spinner", () => {
    const useFetchAvailableTokensMocked = mocked(useFetchAvailableTokens);

    useFetchAvailableTokensMocked.mockReturnValue({
      availableTokens: undefined,
      isFetchingAvailableTokens: false,
    });
    const { queryByTestId } = render(<Portfolio />);

    expect(queryByTestId("loader")).not.toBeInTheDocument();
  });
});
