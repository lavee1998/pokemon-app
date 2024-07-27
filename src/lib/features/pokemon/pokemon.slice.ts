import { PayloadAction } from "@reduxjs/toolkit";
import { PokemonType } from "./pokemon.types";
import { createAppSlice } from "@/lib/createAppSlice";
import { fetchPokemonTypes } from "./pokemon.request";

export interface PokemonState {
  types: PokemonType[];
  selectedType: PokemonType | null;
  status: "idle" | "loading" | "failed";
}

const initialState: PokemonState = {
  types: [],
  selectedType: null,
  status: "idle",
};

export const pokemonSlice = createAppSlice({
  name: "pokemon",
  initialState,
  reducers: (create) => ({
    setSelectedPokemonType: create.reducer(
      (state, action: PayloadAction<PokemonType>) => {
        state.selectedType = action.payload;
      }
    ),
    initializePokemonTypesAsync: create.asyncThunk(
      async () => {
        const response = await fetchPokemonTypes();
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.types = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectTypes: (pokemon) => pokemon.types,
    selectStatus: (pokemon) => pokemon.status,
    selectType: (pokemon) => pokemon.selectedType,
  },
});

export const { initializePokemonTypesAsync, setSelectedPokemonType } = pokemonSlice.actions;

export const { selectTypes, selectStatus, selectType } = pokemonSlice.selectors;

export default pokemonSlice.reducer;
