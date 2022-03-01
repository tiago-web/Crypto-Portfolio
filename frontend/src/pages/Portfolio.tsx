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
} from "@mui/material";

interface TableData {
  id: string;
  name: string;
  quantity: number;
  amount: number;
}

function createData(
  id: string,
  name: string,
  quantity: number,
  amount: number
): TableData {
  return {
    id,
    name,
    quantity,
    amount,
  };
}

const rows = [
  createData("Bitcoin", "BTC", 25.0, 51),
  createData("Ethereum", "ETH", 4, 70),
  createData("Cardano", "ADA", 3.7, 67),
  // createData("A", "A", 1, 1),
  // createData("B", "B", 2, 2),
  // createData("C", "C", 3, 3),
  // createData("D", "D", 4, 4),
  // createData("E", "E", 5, 5),
  // createData("F", "F", 6, 6),
];

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
  id: keyof TableData;
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
  //   property: keyof TableData
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
  //   (property: keyof TableData) => (event: React.MouseEvent<unknown>) => {
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
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
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
  );
};

const Portfolio = () => {
  // const [order, setOrder] = useState<Order>("asc");
  // const [orderBy, setOrderBy] = useState<keyof TableData>("id");
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
        const newSelecteds = rows.map((n) => n.id);
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
      const foundTokenToEdit = rows.find((token) => token.id === id);

      if (foundTokenToEdit) {
        alert(foundTokenToEdit.name);
      }
    },
    [rows]
  );

  const handleRemoveClick = useCallback(
    (id: string) => {
      const foundTokenToRemove = rows.find((token) => token.id === id);

      if (foundTokenToRemove) {
        alert(foundTokenToRemove.name);
      }
    },
    [rows]
  );

  return (
    <Box sx={{ width: "100%", margin: "3rem 0" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
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
              rowCount={rows.length}
            />
            <TableBody>
              {/* {stableSort(rows, getComparator(order, orderBy)) */}

              {rows.map((row) => {
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
                    <TableCell align="center">{row.id}</TableCell>
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
