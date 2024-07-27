import { PayloadAction } from "@reduxjs/toolkit";
import { PokemonDetailed, PokemonType } from "./pokemon.types";
import { createAppSlice } from "@/lib/createAppSlice";
import {
  fetchPokemon,
  fetchPokemons,
  fetchPokemonsByType,
  fetchPokemonTypes,
} from "./pokemon.request";

export interface PokemonState {
  types: PokemonType[];
  searchKeyword: string;
  pokemons: PokemonType[];
  pokemon: PokemonDetailed | null;
  selectedType: PokemonType | null;
  caughtPokemonIds: string[];
  showOnlyCaughtPokemons: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: PokemonState = {
  types: [],
  pokemon: null,
  searchKeyword: "",
  pokemons: [],
  selectedType: null,
  status: "idle",
  caughtPokemonIds: [],
  showOnlyCaughtPokemons: false,
};

export const pokemonSlice = createAppSlice({
  name: "pokemon",
  initialState,
  reducers: (create) => ({
    setShowOnlyCaughtPokemons: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.showOnlyCaughtPokemons = action.payload;
      }
    ),
    setCaughtPokemonIds: create.reducer(
      (state, action: PayloadAction<string[]>) => {
        state.caughtPokemonIds = action.payload;
      }
    ),
    setSelectedPokemonType: create.reducer(
      (state, action: PayloadAction<PokemonType | null>) => {
        state.selectedType = action.payload;
      }
    ),
    setPokemon: create.reducer(
      (state, action: PayloadAction<PokemonDetailed | null>) => {
        state.pokemon = action.payload;
      }
    ),
    setSearchKeyword: create.reducer((state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    }),
    fetchPokemonByIdAsync: create.asyncThunk(
      async (id: string) => {
        const response = await fetchPokemon(id);
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.pokemon = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
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
    fetchPokemonsBySelectedTypeAsync: create.asyncThunk(
      async (pokemonType?: string) => {
        if (pokemonType) {
          const response = await fetchPokemonsByType(pokemonType);
          return response;
        } else {
          const response = await fetchPokemons();
          return response;
        }
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.pokemons = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectCaughtPokemonIds: (pokemon) => pokemon.caughtPokemonIds,
    selectPokemon: (pokemon) => pokemon.pokemon,
    selectTypes: (pokemon) => pokemon.types,
    selectStatus: (pokemon) => pokemon.status,
    selectType: (pokemon) => pokemon.selectedType,
    selectPokemons: (pokemon) => pokemon.pokemons,
    selectSearchKeyword: (pokemon) => pokemon.searchKeyword,
    selectShowOnlyCaughtPokemons: (pokemon) => pokemon.showOnlyCaughtPokemons,
  },
});

export const {
  setShowOnlyCaughtPokemons,
  initializePokemonTypesAsync,
  setSelectedPokemonType,
  setSearchKeyword,
  fetchPokemonsBySelectedTypeAsync,
  fetchPokemonByIdAsync,
  setPokemon,
  setCaughtPokemonIds,
} = pokemonSlice.actions;

export const {
  selectSearchKeyword,
  selectTypes,
  selectStatus,
  selectType,
  selectPokemon,
  selectPokemons,
  selectCaughtPokemonIds,
  selectShowOnlyCaughtPokemons,
} = pokemonSlice.selectors;

export default pokemonSlice.reducer;
