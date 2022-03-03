import { ComponentMeta } from "@storybook/react";

import Autocomplete from "../components/Autocomplete";
import { TokenProps } from "../pages/Portfolio";

export default {
  title: "Components/Autocomplete",
  component: Autocomplete,
  argTypes: {
    onChange: { onChange: { action: "onChange" } },
  },
} as ComponentMeta<typeof Autocomplete>;

const options: Omit<TokenProps, "quantity">[] = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
];

export const NoDefaultValue = () => (
  <Autocomplete onChange={() => {}} options={options} />
);

export const WithDefaultValue = () => (
  <Autocomplete
    onChange={() => {}}
    options={options}
    defaultValue={{ id: "bitcoin", name: "Bitcoin", symbol: "BTC" }}
  />
);

export const NoOptions = () => (
  <Autocomplete onChange={() => {}} options={[]} />
);
