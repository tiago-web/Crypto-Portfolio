import { useQuery } from "react-query";
import { TokenProps } from "../pages/Portfolio";
import { api } from "../services";

export const useFetchPortfolioTokens = () => {
  const {
    data: portfolioTokens,
    isFetching: isFetchingPortfolioTokens,
    isRefetching,
  } = useQuery<TokenProps[]>(
    "portfolio-tokens",
    async () => {
      const response = await api.get<TokenProps[]>("tokens");

      return response.data;
    },
    {
      refetchInterval: 60 * 1000, // Refetch the data every minute to get the market update
    }
  );

  return { portfolioTokens, isFetchingPortfolioTokens, isRefetching };
};
