import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal from "../components/Modal";

export default {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    handleClose: { handleClose: { action: "handleClose" } },
  },
} as ComponentMeta<typeof Modal>;

export const NoDefaultValue = () => (
  <Modal handleClose={() => {}} open={true} />
);
