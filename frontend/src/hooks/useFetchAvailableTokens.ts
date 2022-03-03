import { useQuery } from "react-query";
import { TokenProps } from "../pages/Portfolio";
import { api } from "../services";

export const useFetchAvailableTokens = () => {
  const { data: availableTokens, isFetching: isFetchingAvailableTokens } =
    useQuery<Omit<TokenProps, "quantity">[]>(
      "available-tokens",
      async () => {
        const response = await api.get<TokenProps[]>("tokens/available-tokens");

        return response.data;
      },
      {
        refetchOnWindowFocus: false,
      }
    );

  return { availableTokens, isFetchingAvailableTokens };
};
