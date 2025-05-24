import { FormControl, InputBasePropsSizeOverrides } from "@mui/material";
import FilledInput, { FilledInputProps } from "@mui/material/FilledInput";
import { OverridableStringUnion } from "@mui/types";
import { useEffect, useState } from "react";

export type NumberInputType = Omit<FilledInputProps, "onChange" | "value"> & {
  size?: OverridableStringUnion<"small" | "medium", InputBasePropsSizeOverrides>;
  value: number;
  onChange: (value: number) => void;
};

const NumberInput: React.FC<NumberInputType> = ({ size = "small", value = 0, onChange }) => {
  const initialVal = value !== undefined ? value : 0;
  const [innerValue, setInnerValue] = useState<string>(String(initialVal));

  useEffect(() => {
    const newVal = value !== undefined ? value : 0;
    setInnerValue(String(newVal));
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setInnerValue(val);

    const numberVal = Number(val);
    if (val !== "" && !isNaN(numberVal) && numberVal >= 0) {
      onChange(numberVal);
    }
  };

  const handleOnBlur = () => {
    if (innerValue === "" || isNaN(Number(innerValue))) {
      const fallbackVal = value !== undefined ? value : 0;
      setInnerValue(String(fallbackVal));
    }
  };

  const handleOnFocus = () => {
    setInnerValue("");
  };

  return (
    <FormControl sx={{ m: 1, width: "30%", background: "#fff", borderRadius: 2 }}>
      <FilledInput
        size={size}
        type="number"
        value={innerValue}
        onFocus={handleOnFocus}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        inputProps={{ style: { padding: "10px" } }}
        sx={{
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
          "& input[type=number]::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "& input[type=number]::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          fontWeight: "bold",
        }}
      />
    </FormControl>
  );
};

export default NumberInput;
