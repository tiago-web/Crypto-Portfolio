import axios from "axios";
import { QueryClient } from "react-query";

const baseURL = "http://localhost:3333/api/v1/";

export const api = axios.create({
  baseURL,
  timeout: 60 * 1000, // Timeout
});

export const queryClient = new QueryClient();
