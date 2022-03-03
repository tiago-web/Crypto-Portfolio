import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal from "../components/Modal";
import { Button } from "@mui/material";

export default {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    handleClose: { handleClose: { action: "handleClose" } },
  },
} as ComponentMeta<typeof Modal>;

export const WithoutChildren = () => (
  <Modal handleClose={() => {}} open={true} />
);

export const WithChildren = () => (
  <Modal handleClose={() => {}} open={true}>
    <h2>This is an example of a modal</h2>
    <p>You can also use the modal to display form elements</p>

    <Button
      variant="contained"
      sx={{
        width: "48%",
        height: "3.2rem",
        marginTop: "1rem",
      }}
      onClick={() => {}}
    >
      Confirm
    </Button>
  </Modal>
);
