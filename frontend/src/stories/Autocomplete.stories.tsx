import { ComponentMeta } from "@storybook/react";

import Autocomplete from "../components/Autocomplete";

export default {
  title: "Components/Autocomplete",
  component: Autocomplete,
  argTypes: {
    onChange: { onChange: { action: "onChange" } },
  },
} as ComponentMeta<typeof Autocomplete>;

const options = [
  { name: "Bitcon", symbol: "BTC" },
  { name: "Ethereum", symbol: "ETH" },
];

export const NoDefaultValue = () => (
  <Autocomplete onChange={() => {}} options={options} />
);

export const DefaultValue = () => (
  <Autocomplete
    onChange={() => {}}
    options={options}
    defaultValue={{ name: "Bitcon", symbol: "BTC" }}
  />
);

export const NoOptions = () => (
  <Autocomplete onChange={() => {}} options={[]} />
);
