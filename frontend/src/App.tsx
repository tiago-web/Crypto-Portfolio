import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Portfolio from "./pages/Portfolio";
import { api } from "./services";
import { useSnackbar } from "notistack";

const App = () => {
  const { enqueueSnackbar } = useSnackbar();

  const apiErrorInterceptor = () => {
    api.interceptors.response.use(
      (res) => res,
      (err) => {
        console.log("Error data => ", err.response.data);

        const errorMessage = err.response.data.message;

        enqueueSnackbar(errorMessage, {
          variant: "error",
        });

        throw new Error(err);
      }
    );
  };

  apiErrorInterceptor();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Portfolio />
      </Container>
    </>
  );
};

export default App;
