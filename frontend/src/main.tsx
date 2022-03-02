import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";

import { queryClient } from "./services";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={3000}
      maxSnack={3}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
