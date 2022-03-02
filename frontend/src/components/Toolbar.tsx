import {
  Toolbar as MUIToolbar,
  Typography,
  IconButton,
  Tooltip,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useState } from "react";
import Autocomplete from "./Autocomplete";
import Modal from "./Modal";

interface ToolbarProps {
  numSelected: number;
  setChoosenTokenToAdd: any;
  availableTokens: any[];
  inputedQuantity: any;
  setInputedQuantity: any;
  handleAddClick: any;
  handleDeleteSelectedClick: any;
  choosenTokenToAdd: any;
}

const Toolbar: React.FC<ToolbarProps> = ({
  numSelected,
  setChoosenTokenToAdd,
  availableTokens,
  inputedQuantity,
  setInputedQuantity,
  handleAddClick,
  handleDeleteSelectedClick,
  choosenTokenToAdd,
}) => {
  const [openDeleteAllSelectedTokenModal, setOpenDeleteAllSelectedTokenModal] =
    useState(false);

  return (
    <>
      <MUIToolbar
        sx={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          paddingTop: ".8rem",
          width: "max-content",
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle">
          Crypto App
        </Typography>
        {numSelected > 0 && (
          <Button
            color="error"
            sx={{
              position: "absolute",
              right: "0",
            }}
            onClick={() => setOpenDeleteAllSelectedTokenModal(true)}
          >
            Delete selected tokens
          </Button>
        )}

        <Box
          sx={{
            margin: "1.5rem 0 2rem",
            display: "flex",
          }}
        >
          <Autocomplete
            id="token-autocomplete"
            defaultValue={choosenTokenToAdd}
            onChange={setChoosenTokenToAdd}
            options={availableTokens}
          />
          <TextField
            sx={{ marginLeft: "1rem" }}
            id="token-quantity"
            label="Quantity"
            variant="outlined"
            type="number"
            value={inputedQuantity ?? ""}
            onChange={(e) => {
              const inputedValue = e.target.value
                ? Number(e.target.value)
                : undefined;

              setInputedQuantity(
                inputedValue !== undefined && inputedValue < 0
                  ? 0
                  : inputedValue
              ); // prevents negative input
            }}
          />
          <Button
            sx={{ width: 120, marginLeft: "1rem" }}
            variant="contained"
            onClick={handleAddClick}
          >
            ADD
          </Button>
        </Box>
      </MUIToolbar>

      {/* TODO: As the user if he is sure about what they are doing */}
      <Modal
        ariaLabel="delete-all-selected-token-modal"
        open={openDeleteAllSelectedTokenModal}
        handleClose={() => setOpenDeleteAllSelectedTokenModal(false)}
      >
        <h2>Delete Selected Tokens</h2>
        <p>
          Are you sure you want to delete all selected tokens from your
          portfolio?
        </p>

        <Button
          color="error"
          variant="contained"
          sx={{
            width: "48%",
            height: "3.2rem",
            marginTop: "1rem",
          }}
          onClick={() => {
            console.log("deleted all selected clicked");
            handleDeleteSelectedClick();
            setOpenDeleteAllSelectedTokenModal(false);
          }}
        >
          Confirm
        </Button>
      </Modal>
    </>
  );
};

export default Toolbar;
