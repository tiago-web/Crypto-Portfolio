import { useState, useCallback } from "react";

import { Box, Paper } from "@mui/material";

import { useQuery } from "react-query";

import Table from "../components/Table";
import Toolbar from "../components/Toolbar";
import { api } from "../services";
import mockResponse from "../mockResponse.json";

export interface TokenProps {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  amount?: number;
}

interface TableColumns {
  id: keyof TokenProps;
  label: string;
}

interface MarketDataProps {
  id: string;
  symbol: string;
  name: string;
  current_price_usd: number;
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
  const [tableData, setTableData] = useState<TokenProps[]>([]);
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const [choosenTokenToAdd, setChoosenTokenToAdd] = useState<
    Partial<TokenProps>
  >({} as Partial<TokenProps>);

  const [inputedQuantity, setInputedQuantity] = useState<number | undefined>(
    undefined
  );

  const { data: availableTokens, isFetching } = useQuery<
    Omit<TokenProps, "quantity">[]
  >(
    "available-tokens",
    async () => {
      // const response = await api.get<TokenProps[]>("tokens/available-tokens");

      // return response.data;
      return mockResponse as TokenProps[];
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { isFetching: isLoading } = useQuery<Partial<TokenProps[]>>(
    "portfolio-tokens",
    async () => {
      const response = await api.get<TokenProps[]>("tokens");

      setTableData(response.data);

      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

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
        await api.patch(`tokens/update-quantity/${id}`, {
          new_quantity: newQuantity,
        });

        // TODO Update Quantity in table
        // setTableData((prevState) =>
        //   prevState.filter((token) => token.id !== id)
        // );
      } catch (err: any) {
        console.log(err.message);
      }
    },
    [tableData]
  );

  const handleRemoveClick = useCallback(async (id: string) => {
    try {
      await api.delete(`tokens/${id}`);

      setTableData((prevState) => prevState.filter((token) => token.id !== id));
    } catch (err: any) {
      console.log(err.message);
    }
  }, []);

  const handleDeleteSelectedClick = useCallback(async () => {
    console.log(selectedList);

    // try {
    //   await api.delete(`tokens/${id}`);
    //   setTableData((prevState) => prevState.filter((token) => token.id !== id));
    // } catch (err: any) {
    //   console.log(err.message);
    // }
  }, [selectedList]);

  const handleAddClick = useCallback(async () => {
    // const {
    //   data: { current_price_usd },
    // } = await api.get<MarketDataProps>(
    //   `/tokens/market-data/${choosenTokenToAdd.id}`
    // );

    // amount: current_price_usd * inputedQuantity,

    // Checking if the token was selected
    if (
      !choosenTokenToAdd ||
      (Object.keys(choosenTokenToAdd).length === 0 &&
        choosenTokenToAdd.constructor === Object)
    ) {
      alert("The token must be choosen");

      return;
    }

    if (!inputedQuantity) {
      alert("The quantity must be selected");

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

        foundTokenInList.quantity = newQuantity;

        const result = await api.patch(
          `tokens/update-quantity/${choosenTokenToAdd?.id}`,
          {
            new_quantity: newQuantity,
          }
        );

        console.log("result for edit: ", result);
      } else {
        const result = await api.post(`/tokens`, {
          id: choosenTokenToAdd?.id,
          symbol: choosenTokenToAdd?.symbol,
          name: choosenTokenToAdd?.name,
          quantity: inputedQuantity,
        });

        console.log("result for add: ", result);

        newTableData = [...tableData, result.data];
      }

      setTableData(newTableData);
      setChoosenTokenToAdd({} as Partial<TokenProps>);
      setInputedQuantity(undefined);
    } catch (err: any) {
      console.log(err.message);
    }
  }, [inputedQuantity, choosenTokenToAdd, tableData]);

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
