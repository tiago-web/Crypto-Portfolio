import axios from "axios";
import { QueryClient } from "react-query";

const baseURL = "http://localhost:3333/api/v1/";

export const api = axios.create({
  baseURL,
  timeout: 60 * 1000, // One minute timeout
});

export const queryClient = new QueryClient();
