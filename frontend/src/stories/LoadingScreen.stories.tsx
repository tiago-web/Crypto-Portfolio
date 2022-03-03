import { ComponentMeta } from "@storybook/react";

import LoadingScreen from "../components/LoadingScreen";

export default {
  title: "Components/LoadingScreen",
  component: LoadingScreen,
} as ComponentMeta<typeof LoadingScreen>;

export const NoDefaultValue = () => <LoadingScreen />;
