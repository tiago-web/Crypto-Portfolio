import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Portfolio from "./pages/Portfolio";

const App = () => {
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
