import { render } from "@testing-library/react";
import Toolbar from "../../components/Toolbar";
import { TokenProps } from "../../pages/Portfolio";

jest.mock("notistack", () => ({
  useSnackbar() {
    return { enqueueSnackbar: jest.fn() };
  },
}));

const options: Omit<TokenProps, "quantity">[] = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
];

describe("Toolbar Component", () => {
  it("should render the Toolbar component", () => {
    const { getByTestId } = render(
      <Toolbar
        numSelected={2}
        setChoosenTokenToAdd={() => {}}
        availableTokens={options}
        inputedQuantity={undefined}
        setInputedQuantity={() => {}}
        handleAddClick={() => {}}
        handleDeleteSelectedClick={() => {}}
        choosenTokenToAdd={null}
      />
    );

    expect(getByTestId("toolbar")).toBeInTheDocument();
  });
});
