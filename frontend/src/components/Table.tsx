import { FaEdit, FaTrashAlt } from "react-icons/fa";

import {
  Table as MUITable,
  TableHead as MUITableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Checkbox,
  TableFooter,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";

import Modal from "./Modal";
import { exponentialToDecimal } from "../utils/exponentialToDecimal";

interface TableHeadProps {
  columns: any[];
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

const TableHead: React.FC<TableHeadProps> = ({
  columns,
  onSelectAllClick,
  numSelected,
  rowCount,
}) => {
  return (
    <MUITableHead style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
      <TableRow>
        <TableCell style={{ border: "none" }} padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all tokens",
            }}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            style={{ border: "none" }}
            key={column.id}
            align="center"
            padding="normal"
            // sortDirection={orderBy === column.id ? order : false}
          >
            {column.label}

            {/* <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
                {orderBy === column.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </MUITableHead>
  );
};

interface TableProps {
  columns: any[];
  tableData: any[];
  selectedList: any;
  handleSelectAllClick: any;
  handleSelectClick: any;
  handleEditClick: any;
  handleRemoveClick: any;
}

const Table: React.FC<TableProps> = ({
  columns,
  tableData,
  selectedList,
  handleSelectAllClick,
  handleSelectClick,
  handleEditClick,
  handleRemoveClick,
}) => {
  const [newQuantity, setNewQuantity] = useState<number | undefined>(undefined);

  const [selectedTokenToEdit, setSelectedTokenToEdit] = useState<any>(
    {} as any
  );
  const [openEditTokenModal, setOpenEditTokenModal] = useState(false);

  const [selectedTokenToRemove, setSelectedTokenToRemove] = useState<any>(
    {} as any
  );
  const [openRemoveTokenModal, setOpenRemoveTokenModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = tableData.reduce((accumulator, element) => {
      return accumulator + element.amount;
    }, 0);

    setTotalAmount(total);
  }, [tableData]);

  return (
    <>
      <TableContainer sx={{ overflowX: "unset" }}>
        <MUITable
          sx={{ minWidth: 750, minHeight: 180 }}
          aria-labelledby="crypto-portfolio"
          size="medium"
        >
          <TableHead
            columns={columns}
            numSelected={selectedList.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={tableData.length}
          />
          <TableBody>
            {tableData.map((row) => {
              const isItemSelected = selectedList.includes(row.id);

              return (
                <TableRow
                  aria-checked={isItemSelected}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onChange={() => {
                        handleSelectClick(row.id);
                      }}
                      inputProps={{
                        "aria-labelledby": row.id,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{row.symbol}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">
                    $ {exponentialToDecimal(row.amount) ?? 0}
                  </TableCell>
                  <TableCell align="center">
                    <FaEdit
                      size={18}
                      color="rgba(0, 0, 0, 0.6)"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedTokenToEdit(row);

                        setOpenEditTokenModal(true);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <FaTrashAlt
                      color="#d32f2f"
                      size={16}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedTokenToRemove(row);
                        setOpenRemoveTokenModal(true);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter
            style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
          >
            <TableRow>
              <TableCell>
                <Typography
                  style={{ fontWeight: "bold", color: "#000" }}
                  align="center"
                >
                  TOTAL:
                </Typography>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell>
                <Typography
                  style={{ fontWeight: "bold", color: "#000" }}
                  align="center"
                >
                  $ {totalAmount.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </MUITable>
      </TableContainer>

      <Modal
        ariaLabel="edit-token-modal"
        open={openEditTokenModal}
        handleClose={() => setOpenEditTokenModal(false)}
      >
        <h2>{`Editing: ${selectedTokenToEdit.name} - ${selectedTokenToEdit.symbol}`}</h2>
        <Box
          sx={{
            display: "flex",
            marginTop: "1.8rem",
          }}
        >
          <TextField
            sx={{ flex: 1 }}
            id="new-token-quantity"
            label="New Quantity"
            variant="outlined"
            type="number"
            value={newQuantity ?? ""}
            onChange={(e) => {
              const input = e.target.value ? Number(e.target.value) : undefined;

              setNewQuantity(input !== undefined && input < 0 ? 0 : input); // prevents negative input
            }}
          />

          <Button
            variant="contained"
            sx={{ height: "auto", marginLeft: "1rem", width: "30%" }}
            onClick={() => {
              handleEditClick(selectedTokenToEdit.id, newQuantity);
              setOpenEditTokenModal(false);
              setNewQuantity(undefined);
            }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>

      <Modal
        ariaLabel="remove-token-modal"
        open={openRemoveTokenModal}
        handleClose={() => setOpenRemoveTokenModal(false)}
      >
        <h2>{`Removing: ${selectedTokenToRemove.name} - ${selectedTokenToRemove.symbol}`}</h2>
        <p>{`Are you sure you want to remove of the crypto '${selectedTokenToRemove.name}' from your portfolio?`}</p>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1.8rem",
          }}
        >
          <Button
            color="error"
            variant="outlined"
            sx={{ width: "48%", height: "3.2rem" }}
            onClick={() => {
              setOpenRemoveTokenModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{ width: "48%", height: "3.2rem" }}
            onClick={() => {
              handleRemoveClick(selectedTokenToRemove.id);
              setOpenRemoveTokenModal(false);
            }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Table;
