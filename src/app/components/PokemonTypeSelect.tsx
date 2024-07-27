"use client";
import {
  fetchPokemonsBySelectedTypeAsync,
  selectStatus,
  selectType,
  selectTypes,
  setSelectedPokemonType,
} from "@/lib/features/pokemon/pokemon.slice";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";

export default function PokemonTypeSelect() {
  const dispatch = useAppDispatch();
  const pokemonTypes = useAppSelector(selectTypes);
  // const status = useAppSelector(selectStatus); TODO
  const selectedType = useAppSelector(selectType);

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
        onChange={handleChange}
      >
        <MenuItem key={selectAllId} value={selectAllId}>
          Select all
        </MenuItem>
        {pokemonTypes?.map((type, i) => (
          <MenuItem key={i} value={type.id}>
            {type.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
