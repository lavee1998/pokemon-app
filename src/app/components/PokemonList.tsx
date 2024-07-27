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
import { Box, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";

export default function PokemonList() {
  const pokemons = useAppSelector(selectPokemons);
  const searchKeyword = useAppSelector(selectSearchKeyword);
  const selectedType = useAppSelector(selectType);
  const showOnlyCaughtPokemons = useAppSelector(selectShowOnlyCaughtPokemons);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const caughtPokemonIds = useAppSelector(selectCaughtPokemonIds);
  const updateCaughtPokemonIds = useUpdateCaughtPokemonIds();

  const handleClickCatchReleaseButton = (id: string) => {
    updateCaughtPokemonIds(id);
  };

  const getIsAlreadyCatchedPokemon = (id: string) => {
    return caughtPokemonIds.find((pokemonId) => pokemonId == id);
  };

  const getColorBasedOnIsCaught = (id: string) => {
    return getIsAlreadyCatchedPokemon(id)
      ? theme.palette.secondary.main
      : theme.palette.primary.main;
  };

  return (
    <Box
      bgcolor={matches ? theme.palette.primary.light : "inherit"}
      maxHeight={"400px"}
      overflow={"auto"}
      p={2}
    >
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
                      sx={{
                        bgcolor: "white",
                      }}
                      borderColor={getColorBasedOnIsCaught(pokemon.id)}
                    >
                      <Grid item xs={4}>
                        {pokemon.name}
                      </Grid>
                      <Grid item xs={4}>
                        {selectedType?.name}
                      </Grid>
                      <Grid item xs={4}>
                        {getIsAlreadyCatchedPokemon(pokemon.id) && "Caught"}
                      </Grid>
                    </Grid>
                  </Link>
                </Grid>

                <Grid item xs={3}>
                  <Button
                    onClick={() => handleClickCatchReleaseButton(pokemon.id)}
                    variant={"contained"}
                    sx={{ bgcolor: getColorBasedOnIsCaught(pokemon.id) }}
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
