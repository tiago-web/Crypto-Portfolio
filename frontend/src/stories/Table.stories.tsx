import { ComponentMeta } from "@storybook/react";

import Table from "../components/Table";

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

export const NoDefaultValue = () => (
  <Table
    columns={[]}
    tableData={[]}
    selectedList={[]}
    handleSelectAllClick={() => {}}
    handleSelectClick={() => {}}
    handleEditClick={() => {}}
    handleRemoveClick={() => {}}
  />
);
