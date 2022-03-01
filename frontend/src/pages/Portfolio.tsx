import { useState, useCallback } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  TableFooter,
  TextField,
  Button,
} from "@mui/material";

import { useQuery } from "react-query";

import Autocomplete from "../components/Autocomplete";
import axios from "axios";

export interface TokenProps {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  amount: number;
}

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// type Order = "asc" | "desc";

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string }
// ) => number {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// // This method is created to support IE11
// function stableSort<T>(
//   array: readonly T[],
//   comparator: (a: T, b: T) => number
// ) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

interface TableColumns {
  id: keyof TokenProps;
  label: string;
}

const columns: readonly TableColumns[] = [
  {
    id: "id",
    label: "Name",
  },
  {
    id: "name",
    label: "Token",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
  {
    id: "amount",
    label: "Amount in USD",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  // onRequestSort: (
  //   event: React.MouseEvent<unknown>,
  //   property: keyof TokenProps
  // ) => void;
  // order: Order;
  // orderBy: string;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    onSelectAllClick,
    // order,
    // orderBy,
    // onRequestSort,
    numSelected,
    rowCount,
  } = props;
  // const createSortHandler =
  //   (property: keyof TokenProps) => (event: React.MouseEvent<unknown>) => {
  //     onRequestSort(event, property);
  //   };

  return (
    <TableHead style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
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
    </TableHead>
  );
};

interface EnhancedTableToolbarProps {
  numSelected: number;
  toolbarFooterComponent: React.ReactNode;
}

const EnhancedTableToolbar = ({
  numSelected,
  toolbarFooterComponent,
}: EnhancedTableToolbarProps) => {
  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle">
          Crypto App
        </Typography>
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton>
              <Typography variant="h6">Delete all tokens</Typography>
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      {toolbarFooterComponent && (
        <Box
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          {toolbarFooterComponent}
        </Box>
      )}
    </>
  );
};

const Portfolio = () => {
  // const [order, setOrder] = useState<Order>("asc");
  // const [orderBy, setOrderBy] = useState<keyof TokenProps>("id");
  const { data: availableTokens, isFetching } = useQuery<Partial<TokenProps[]>>(
    "available-tokens",
    async () => {
      const response = await axios.get<TokenProps[]>(
        "https://api.coingecko.com/api/v3/coins/list"
      );

      const uniqueTokenSymbols: TokenProps[] = [
        ...new Map(
          response.data.map((token: TokenProps) => [token.symbol, token])
        ).values(),
      ]; // remove duplicated tokens

      return uniqueTokenSymbols.map((token: TokenProps) => ({
        ...token,
        label: token.name,
      }));
    }
  );

  const [tableData, setTableData] = useState<TokenProps[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  // const handleRequestSort = useCallback(
  //   (event: React.MouseEvent<unknown>, property: keyof TableData) => {
  //     const isAsc = orderBy === property && order === "asc";
  //     setOrder(isAsc ? "desc" : "asc");
  //     setOrderBy(property);
  //   },
  //   [orderBy, order]
  // );

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelecteds = tableData.map((n) => n.id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    },
    []
  );

  const handleSelectClick = useCallback((id: string) => {
    setSelected((prevState) => {
      const foundToken = prevState.find((tokenId) => tokenId === id);

      if (foundToken) {
        return prevState.filter((tokenId) => tokenId !== id);
      } else {
        return [...prevState, id];
      }
    });
  }, []);

  const handleEditClick = useCallback(
    (id: string) => {
      const foundTokenToEdit = tableData.find((token) => token.id === id);

      if (foundTokenToEdit) {
        alert(foundTokenToEdit.name);
      }
    },
    [tableData]
  );

  const handleRemoveClick = useCallback(
    (id: string) => {
      const foundTokenToRemove = tableData.find((token) => token.id === id);

      if (foundTokenToRemove) {
        alert(foundTokenToRemove.name);
      }
    },
    [tableData]
  );

  const handleAddClick = useCallback((id: string) => {
    alert(id);
  }, []);

  return (
    <Box sx={{ width: "100%", margin: "3rem 0" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          toolbarFooterComponent={
            <Box
              sx={{
                margin: "1.5rem 0",
                display: "flex",
              }}
            >
              <Autocomplete
                id="token-autocomplete"
                options={availableTokens ?? []}
              />
              <TextField
                sx={{ marginLeft: "1rem" }}
                id="token-quantity"
                label="Amount"
                variant="outlined"
                type="number"
              />
              <Button
                sx={{ width: 120, marginLeft: "1rem" }}
                variant="contained"
              >
                ADD
              </Button>
            </Box>
          }
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="crypto-portfolio"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              // order={order}
              // orderBy={orderBy}
              // onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              rowCount={tableData.length}
            />
            <TableBody>
              {/* {stableSort(tableData, getComparator(order, orderBy)) */}

              {tableData.map((row) => {
                const isItemSelected = selected.includes(row.id);

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
                        onChange={() => handleSelectClick(row.id)}
                        inputProps={{
                          "aria-labelledby": row.id,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{row.symbol}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">$ {row.amount}</TableCell>
                    <TableCell align="center">
                      <FaEdit onClick={() => handleEditClick(row.id)} />
                    </TableCell>
                    <TableCell align="center">
                      <FaTrashAlt onClick={() => handleRemoveClick(row.id)} />
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
                    $ 200
                  </Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
export default Portfolio;
