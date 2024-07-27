"use client";

import { useUpdateCaughtPokemonIds } from "@/lib/features/pokemon/pokemon.hooks";
import {
  selectCaughtPokemonIds,
  selectPokemon,
  setPokemon,
} from "@/lib/features/pokemon/pokemon.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, ButtonBase, Grid, useTheme } from "@mui/material";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DetailsView() {
  const pokemon = useAppSelector(selectPokemon);
  const dispatch = useAppDispatch();
  const caughtPokemonIds = useAppSelector(selectCaughtPokemonIds);
  const updateCaughtPokemonIds = useUpdateCaughtPokemonIds();

  const handleClickCatchReleaseButton = (id: string) => {
    updateCaughtPokemonIds(id);
  };

  const router = useRouter();
  const theme = useTheme();

  const handleClickBackToSearch = () => {
    dispatch(setPokemon(null));
    router.push("/");
  };

  const getIsAlreadyCatchedPokemon = (id: string) => {
    return caughtPokemonIds.find((pokemonId) => pokemonId == id);
  };

  if (!pokemon) return null; //TODO

  return (
    <Box width={"100%"}>
      <ButtonBase onClick={handleClickBackToSearch}>
        <Box fontWeight={600} display={"flex"} alignItems={"center"}>
          <ArrowBack />
          Back to search
        </Box>
      </ButtonBase>
      <Grid container>
        <Grid item xs={6}>
          <NextImage
            width={400} //TODO
            height={300}
            alt={pokemon?.name + "-profile-image"}
            src={pokemon?.imageUrl || ""}
          />
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid container p={2} bgcolor={theme.palette.primary.main}>
              <Grid item xs={6}>
                Name
              </Grid>
              <Grid item xs={6}>
                {pokemon?.name}
              </Grid>
            </Grid>
            <Grid container p={2} bgcolor={theme.palette.secondary.main}>
              <Grid item xs={6}>
                Weight
              </Grid>
              <Grid item xs={6}>
                {pokemon?.weight}kg
              </Grid>
            </Grid>
            <Grid container p={2} bgcolor={theme.palette.secondary.main}>
              <Grid item xs={6}>
                Height
              </Grid>
              <Grid item xs={6}>
                {pokemon?.height}m
              </Grid>
            </Grid>
            <Grid container p={2} bgcolor={theme.palette.primary.main}>
              <Grid item xs={6}>
                Abilities
              </Grid>
              <Grid item xs={6}>
                {pokemon?.abilities.map(
                  (ability, i) =>
                    !!ability.is_hidden && (
                      <Box key={i}>{ability.ability.name}</Box>
                    )
                )}
              </Grid>
            </Grid>
          </Grid>
          <Button
            sx={{
              mt: theme.spacing(3),
            }}
            onClick={() => handleClickCatchReleaseButton(pokemon.id)}
            fullWidth
            variant="contained"
          >
            {getIsAlreadyCatchedPokemon(pokemon.id) ? "Release" : "Catch"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
