import * as React from "react";

import {
  Autocomplete as MUIAutocomplete,
  Typography,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { VariableSizeList, ListChildComponentProps } from "react-window";

const LISTBOX_PADDING = 8; // px

const renderRow: React.FC<ListChildComponentProps> = ({
  data,
  index,
  style,
}) => {
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  if (dataSet[1]) {
    return (
      <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
        {dataSet[1]}
      </Typography>
    );
  } else {
    return <div style={{ display: "none" }} />;
  }
};

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

// Adapter for react-window
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, ...other }, ref) => {
  const itemData: React.ReactChild[] = [];
  (children as React.ReactChild[]).forEach(
    (item: React.ReactChild & { children?: React.ReactChild[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 24 : 22;

  const getChildSize = (child: React.ReactChild) => {
    if (child.hasOwnProperty("group")) {
      return 3;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 6) {
      return 6 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

interface AutocompleteProps {
  id: string;
  options: any[];
  onChange(selectedItem: any): void;
  defaultValue?: any;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  id,
  options,
  onChange,
  defaultValue = "",
}) => {
  const [autocompleteValue, setAutocompleteValue] =
    React.useState(defaultValue);

  React.useEffect(() => {
    setAutocompleteValue(defaultValue);
  }, [defaultValue]);

  return (
    <MUIAutocomplete
      id={id}
      sx={{ width: 300 }}
      value={autocompleteValue}
      onChange={(e, value) => {
        onChange(value);
        setAutocompleteValue(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a Token"
          inputProps={{
            ...params.inputProps,
            autoComplete: "off",
          }}
        />
      )}
      disableListWrap
      disablePortal
      getOptionLabel={(option) =>
        option.symbol && option.name ? `${option.symbol} - ${option.name}` : ""
      }
      renderOption={(props, option) => [
        props,
        `${option.symbol} - ${option.name}`,
      ]}
      ListboxComponent={ListboxComponent}
      options={options}
      groupBy={(option) => `${option.symbol} - ${option.name}`}
      renderGroup={(params) => params}
    />
  );
};
export default Autocomplete;
