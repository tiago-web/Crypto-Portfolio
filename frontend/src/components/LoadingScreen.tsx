import { Box, CircularProgress } from "@mui/material";

const LoadingScreen = () => (
  <Box
    data-testid="loader"
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "90vh",
      width: "100%",
    }}
  >
    <CircularProgress />
  </Box>
);

export default LoadingScreen;
