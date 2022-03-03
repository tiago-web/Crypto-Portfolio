import { useState, useCallback, useEffect } from "react";

import { Box, Paper } from "@mui/material";

import Table, { TableColumns } from "../components/Table";
import Toolbar from "../components/Toolbar";
import { api } from "../services";
import LoadingScreen from "../components/LoadingScreen";
import { useSnackbar } from "notistack";
import { useFetchAvailableTokens } from "../hooks/useFetchAvailableTokens";
import { useFetchPortfolioTokens } from "../hooks/useFetchPortfolioTokens";

export interface TokenProps {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  amount?: number;
}

const columns: TableColumns[] = [
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

const Portfolio = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState<TokenProps[]>([]);
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const [choosenTokenToAdd, setChoosenTokenToAdd] =
    useState<Omit<TokenProps, "quantity"> | null>(null);

  const [inputedQuantity, setInputedQuantity] =
    useState<number | undefined>(undefined);

  const { availableTokens, isFetchingAvailableTokens } =
    useFetchAvailableTokens();

  const { portfolioTokens, isFetchingPortfolioTokens, isRefetching } =
    useFetchPortfolioTokens();

  useEffect(() => {
    if (portfolioTokens) {
      setTableData(portfolioTokens);
    }
  }, [portfolioTokens]);

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelecteds = tableData.map((n) => n.id);
        setSelectedList(newSelecteds);
        return;
      }
      setSelectedList([]);
    },
    [tableData]
  );

  const handleSelectClick = useCallback((id: string) => {
    setSelectedList((prevState) => {
      const foundToken = prevState.find((tokenId) => tokenId === id);

      if (foundToken) {
        return prevState.filter((tokenId) => tokenId !== id);
      } else {
        return [...prevState, id];
      }
    });
  }, []);

  const handleEditClick = useCallback(
    async (id: string, newQuantity: number | undefined) => {
      try {
        let newTableData: TokenProps[] = [...tableData];

        const foundTokenInList = newTableData.find((token) => token.id === id);

        // If the token was found in the portfolio the quantity will be edited
        if (foundTokenInList && newQuantity) {
          const result = await api.patch(`tokens/update-quantity/${id}`, {
            new_quantity: newQuantity,
          });

          foundTokenInList.quantity = result.data.quantity;
          foundTokenInList.amount = result.data.amount;
        }

        enqueueSnackbar("Token successfully edited", {
          variant: "success",
        });

        setTableData(newTableData);
      } catch (err: any) {
        console.log(err.message);
      }
    },
    [tableData]
  );

  const handleRemoveClick = useCallback(async (id: string) => {
    try {
      await api.delete(`tokens/${id}`);

      enqueueSnackbar("Token successfully removed", {
        variant: "success",
      });

      setTableData((prevState) => prevState.filter((token) => token.id !== id));
    } catch (err: any) {
      console.log(err.message);
    }
  }, []);

  const handleDeleteSelectedClick = useCallback(async () => {
    try {
      await api.delete("tokens", { data: { ids: selectedList } });

      enqueueSnackbar("Tokens successfully removed", {
        variant: "success",
      });

      setTableData(
        (prevState) =>
          prevState.filter((token) => !selectedList.includes(token.id)) // Remove deleted tokens from table
      );

      setSelectedList([]);
    } catch (err: any) {
      console.log(err.message);
    }
  }, [selectedList]);

  const handleAddClick = useCallback(async () => {
    // Checking if the token was selected
    if (
      !choosenTokenToAdd ||
      (Object.keys(choosenTokenToAdd).length === 0 &&
        choosenTokenToAdd.constructor === Object)
    ) {
      enqueueSnackbar("The token must be choosen", {
        variant: "warning",
      });

      return;
    }

    if (!inputedQuantity) {
      enqueueSnackbar("The quantity must be selected", {
        variant: "warning",
      });

      return;
    }

    try {
      let newTableData: TokenProps[] = [...tableData];

      const foundTokenInList = newTableData.find(
        (token) => token.id === choosenTokenToAdd?.id
      );

      // If the token was found in the portfolio the quantity will be edited
      if (foundTokenInList) {
        const newQuantity = foundTokenInList.quantity + inputedQuantity;

        const result = await api.patch(
          `tokens/update-quantity/${choosenTokenToAdd?.id}`,
          {
            new_quantity: newQuantity,
          }
        );

        foundTokenInList.quantity = result.data.quantity;
        foundTokenInList.amount = result.data.amount;
      } else {
        const result = await api.post(`/tokens`, {
          id: choosenTokenToAdd?.id,
          symbol: choosenTokenToAdd?.symbol,
          name: choosenTokenToAdd?.name,
          quantity: inputedQuantity,
        });

        newTableData = [...tableData, result.data];
      }

      enqueueSnackbar("Token successfully added", {
        variant: "success",
      });

      setTableData(newTableData);
      setChoosenTokenToAdd(null);
      setInputedQuantity(undefined);
    } catch (err: any) {
      console.log(err.message);
    }
  }, [inputedQuantity, choosenTokenToAdd, tableData]);

  if (
    (isFetchingAvailableTokens || isFetchingPortfolioTokens) &&
    !isRefetching
  ) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{ width: "100%", margin: "3rem 0" }}>
      <Paper sx={{ width: "100%", mb: 2, overflowX: "auto" }}>
        <Toolbar
          numSelected={selectedList.length}
          setChoosenTokenToAdd={setChoosenTokenToAdd}
          choosenTokenToAdd={choosenTokenToAdd}
          availableTokens={availableTokens ?? []}
          inputedQuantity={inputedQuantity}
          setInputedQuantity={setInputedQuantity}
          handleAddClick={handleAddClick}
          handleDeleteSelectedClick={handleDeleteSelectedClick}
        />
        <Table
          columns={columns}
          tableData={tableData}
          selectedList={selectedList}
          handleSelectAllClick={handleSelectAllClick}
          handleSelectClick={handleSelectClick}
          handleEditClick={handleEditClick}
          handleRemoveClick={handleRemoveClick}
        />
      </Paper>
    </Box>
  );
};
export default Portfolio;
