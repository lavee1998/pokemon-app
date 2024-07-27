"use client";
import {
  fetchPokemonsBySelectedTypeAsync,
  selectType,
  selectTypes,
  setSelectedPokemonType,
} from "@/lib/features/pokemon/pokemon.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";

export default function PokemonTypeSelect() {
  const dispatch = useAppDispatch();
  const pokemonTypes = useAppSelector(selectTypes);
  const selectedType = useAppSelector(selectType);
  const theme = useTheme();
  const selectAllId = "select-all-id"; //TODO

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    const selectedPokemonType =
      pokemonTypes.find((type) => type.id == selectedValue) || null;

    if (selectedPokemonType || selectedValue === selectAllId) {
      dispatch(setSelectedPokemonType(selectedPokemonType));
      dispatch(fetchPokemonsBySelectedTypeAsync(selectedPokemonType?.id));
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="pokemon-select-label">Pokemon types</InputLabel>
      <Select
        labelId="pokemon-type-select-label"
        id="pokemon-type-select"
        value={selectedType?.id || selectAllId} //TODO
        label="Pokemon types"
        IconComponent={(props) => (
          <KeyboardArrowDown {...props} sx={{ mr: 3 }} />
        )}
        onChange={handleChange}
      >
        <MenuItem key={selectAllId} value={selectAllId}>
          Select all
        </MenuItem>
        {pokemonTypes?.map((type, i) => (
          <MenuItem
            sx={{
              color: i % 2 == 0 ? theme.palette.primary.main : "black",
              background: i % 2 != 0 ? "white" : theme.palette.grey[100],
            }}
            key={i}
            value={type.id}
          >
            {type.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
