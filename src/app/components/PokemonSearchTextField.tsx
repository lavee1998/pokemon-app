"use client";

import {
  selectSearchKeyword,
  setSearchKeyword,
} from "@/lib/features/pokemon/pokemon.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Search } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl/FormControl";
import Input from "@mui/material/Input/Input";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import InputLabel from "@mui/material/InputLabel/InputLabel";

export default function PokemonSearchTextField() {
  const dispatch = useAppDispatch();
  const searchKeyword = useAppSelector(selectSearchKeyword);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setSearchKeyword(value));
  };

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel htmlFor="input-with-icon-adornment">Filters</InputLabel>
      <Input
        value={searchKeyword}
        onChange={handleChange}
        id="input-with-icon-adornment" //TODO
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
