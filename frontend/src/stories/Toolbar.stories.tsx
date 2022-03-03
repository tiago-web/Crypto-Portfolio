import { ComponentMeta } from "@storybook/react";

import Toolbar from "../components/Toolbar";

export default {
  title: "Components/Toolbar",
  component: Toolbar,
  argTypes: {
    handleAddClick: { handleAddClick: { action: "handleAddClick" } },
    handleDeleteSelectedClick: {
      handleDeleteSelectedClick: { action: "handleDeleteSelectedClick" },
    },
    setChoosenTokenToAdd: {
      setChoosenTokenToAdd: { action: "setChoosenTokenToAdd" },
    },
    setInputedQuantity: {
      setInputedQuantity: { action: "setInputedQuantity" },
    },
  },
} as ComponentMeta<typeof Toolbar>;

const options = [
  { name: "Bitcon", symbol: "BTC" },
  { name: "Ethereum", symbol: "ETH" },
];

export const NoDefaultValue = () => (
  <Toolbar
    numSelected={0}
    setChoosenTokenToAdd={() => {}}
    availableTokens={options}
    inputedQuantity={undefined}
    setInputedQuantity={() => {}}
    handleAddClick={() => {}}
    handleDeleteSelectedClick={() => {}}
    choosenTokenToAdd={{ name: "Bitcon", symbol: "BTC" }}
  />
);
