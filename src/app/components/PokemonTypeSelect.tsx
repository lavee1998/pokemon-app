"use client";
import {
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
  const status = useAppSelector(selectStatus);
  const selectedType = useAppSelector(selectType);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedPokemonType = pokemonTypes.find(
      (type) => type.id == event.target.value
    );

    if (selectedPokemonType) {
      dispatch(setSelectedPokemonType(selectedPokemonType));
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedType?.id || ""} //TODO
        label="Age"
        onChange={handleChange}
      >
        {pokemonTypes?.map((type) => (
          <MenuItem key={type.id} value={type.id}>
            {type.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
