import { render } from "@testing-library/react";
import Table, { TableColumns } from "../../components/Table";
import { TokenProps } from "../../pages/Portfolio";

jest.mock("notistack", () => ({
  useSnackbar() {
    return { enqueueSnackbar: jest.fn() };
  },
}));

const columns: TableColumns[] = [
  {
    id: "id",
    label: "Name",
  },
  {
    id: "name",
    label: "Token",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
  {
    id: "amount",
    label: "Amount in USD",
  },
];

const tableData: TokenProps[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    quantity: 0.3,
    amount: 12956,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    quantity: 2,
    amount: 5708.7,
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    quantity: 20,
    amount: 18.28,
  },
];

describe("Table Component", () => {
  it("should render the Table component", () => {
    const { getByTestId } = render(
      <Table
        columns={columns}
        tableData={tableData}
        selectedList={[]}
        handleSelectAllClick={() => {}}
        handleSelectClick={() => {}}
        handleEditClick={() => {}}
        handleRemoveClick={() => {}}
      />
    );

    expect(getByTestId("table")).toBeInTheDocument();
  });
});
