"use client";

import {
  selectShowOnlyCaughtPokemons,
  setShowOnlyCaughtPokemons,
} from "@/lib/features/pokemon/pokemon.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import { ChangeEvent } from "react";

export default function CaughtPokemonCheckbox() {
  const showOnlyCaughtPokemons = useAppSelector(selectShowOnlyCaughtPokemons);
  const dispatch = useAppDispatch();

  const handleChangeShowOnlyCaughtPokemons = (
    _event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    dispatch(setShowOnlyCaughtPokemons(checked));
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={handleChangeShowOnlyCaughtPokemons}
          value={showOnlyCaughtPokemons}
        />
      }
      label="Only show caught Pokemon"
    />
  );
}
