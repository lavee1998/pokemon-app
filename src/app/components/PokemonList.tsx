"use client";

import { useUpdateCaughtPokemonIds } from "@/lib/features/pokemon/pokemon.hooks";
import {
  selectCaughtPokemonIds,
  selectPokemons,
  selectSearchKeyword,
  selectShowOnlyCaughtPokemons,
  selectType,
} from "@/lib/features/pokemon/pokemon.slice";
import { useAppSelector } from "@/lib/hooks";
import { Box, Button, Grid, useTheme } from "@mui/material";
import Link from "next/link";

export default function PokemonList() {
  const pokemons = useAppSelector(selectPokemons);
  const searchKeyword = useAppSelector(selectSearchKeyword);
  const selectedType = useAppSelector(selectType);
  const showOnlyCaughtPokemons = useAppSelector(selectShowOnlyCaughtPokemons);

  const caughtPokemonIds = useAppSelector(selectCaughtPokemonIds);
  const updateCaughtPokemonIds = useUpdateCaughtPokemonIds();

  const handleClickCatchReleaseButton = (id: string) => {
    updateCaughtPokemonIds(id);
  };

  const theme = useTheme();

  const getIsAlreadyCatchedPokemon = (id: string) => {
    return caughtPokemonIds.find((pokemonId) => pokemonId == id);
  };

  return (
    <Box maxHeight={"400px"} overflow={"auto"} p={2}>
      <Grid container p={1} my={1} mx={2}>
        <Grid item xs={3}>
          Name
        </Grid>
        <Grid item xs={3}>
          Type
        </Grid>
        <Grid item xs={3}>
          Status
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      {pokemons
        .filter((pokemon) =>
          showOnlyCaughtPokemons
            ? pokemon.name.includes(searchKeyword) &&
              getIsAlreadyCatchedPokemon(pokemon.id)
            : pokemon.name.includes(searchKeyword)
        )
        .map((pokemon, i) => {
          return (
            <Box key={i}>
              <Grid container mb={2}>
                <Grid item xs={9} pr={1}>
                  <Link href={"pokemons/" + pokemon.id}>
                    <Grid
                      container
                      border={1}
                      p={1}
                      borderRadius={3}
                      borderColor={theme.palette.primary.main}
                    >
                      <Grid item xs={4}>
                        {pokemon.name}
                      </Grid>
                      <Grid item xs={4}>
                        {selectedType?.name}
                      </Grid>
                      <Grid item xs={4}>
                        caught {/* TODO */}
                      </Grid>
                    </Grid>
                  </Link>
                </Grid>

                <Grid item xs={3}>
                  <Button
                    onClick={() => handleClickCatchReleaseButton(pokemon.id)}
                    variant={"contained"}
                  >
                    {getIsAlreadyCatchedPokemon(pokemon.id)
                      ? "Release"
                      : "Catch"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          );
        })}
    </Box>
  );
}
