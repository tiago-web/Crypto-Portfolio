import { ComponentMeta } from "@storybook/react";

import Toolbar from "../components/Toolbar";
import { TokenProps } from "../pages/Portfolio";

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

const options: Omit<TokenProps, "quantity">[] = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
];

export const Default = () => (
  <Toolbar
    numSelected={0}
    setChoosenTokenToAdd={() => {}}
    availableTokens={options}
    inputedQuantity={undefined}
    setInputedQuantity={() => {}}
    handleAddClick={() => {}}
    handleDeleteSelectedClick={() => {}}
    choosenTokenToAdd={null}
  />
);

export const SomeTokensSelected = () => (
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
