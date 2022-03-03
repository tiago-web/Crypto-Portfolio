import { ComponentMeta } from "@storybook/react";

import Table, { TableColumns } from "../components/Table";
import { TokenProps } from "../pages/Portfolio";

export default {
  title: "Components/Table",
  component: Table,
  argTypes: {
    handleSelectAllClick: {
      handleSelectAllClick: { action: "handleSelectAllClick" },
    },
    handleSelectClick: { handleSelectClick: { action: "handleSelectClick" } },
    handleEditClick: { handleEditClick: { action: "handleEditClick" } },
    handleRemoveClick: { handleRemoveClick: { action: "handleRemoveClick" } },
  },
} as ComponentMeta<typeof Table>;

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
    name: "Bitcon",
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

export const WithoutSelection = () => (
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

export const OneTokenSelected = () => (
  <Table
    columns={columns}
    tableData={tableData}
    selectedList={["bitcoin"]}
    handleSelectAllClick={() => {}}
    handleSelectClick={() => {}}
    handleEditClick={() => {}}
    handleRemoveClick={() => {}}
  />
);

export const AllTokensSelected = () => (
  <Table
    columns={columns}
    tableData={tableData}
    selectedList={["bitcoin", "ethereum", "cardano"]}
    handleSelectAllClick={() => {}}
    handleSelectClick={() => {}}
    handleEditClick={() => {}}
    handleRemoveClick={() => {}}
  />
);
