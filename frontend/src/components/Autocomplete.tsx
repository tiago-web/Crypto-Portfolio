import { TextField, Autocomplete as MUIAutocomplete, Box } from "@mui/material";
import { TokenProps } from "../pages/Portfolio";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
];

interface AutocompleteProps {
  id: string;
  options: any[];
}

const Autocomplete = ({ id, options }: AutocompleteProps) => {
  return (
    <MUIAutocomplete
      disablePortal
      id={id}
      options={options}
      getOptionLabel={(option) => option.symbol}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.symbol}
        </Box>
      )}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a Token"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default Autocomplete;
