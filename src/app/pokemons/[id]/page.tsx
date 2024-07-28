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
import { useRouter } from "next/navigation";

//Details view to selected pokemon
export default function DetailsView() {
  const pokemon = useAppSelector(selectPokemon); //selected pokemon from the store
  const caughtPokemonIds = useAppSelector(selectCaughtPokemonIds); //get caught pokemons from store
  const dispatch = useAppDispatch(); //use store dispatch
  const updateCaughtPokemonIds = useUpdateCaughtPokemonIds(); //use hook to update caught pokemons in locale storage + redux store
  const router = useRouter(); //use router hook to navigate on client side
  const theme = useTheme(); //use hook to reach mui theme

  //call hook method to update caught pokemons
  const handleClickCatchReleaseButton = (id: string) => {
    updateCaughtPokemonIds(id);
  };

  //navigate back method
  const handleClickBackToSearch = () => {
    dispatch(setPokemon(null)); //reset pokemon state
    router.push("/");
  };

  //return whether pokemon is already caught or not
  const getIsAlreadyCaughtPokemon = (id: string) => {
    return !!caughtPokemonIds.find((pokemonId) => pokemonId == id);
  };

  if (!pokemon) return null;

  //create attributes map to avoid boilerplate rendering
  const attributes = [
    { name: "Name", value: pokemon?.name, postfix: "" },
    { name: "Weight", value: pokemon?.weight, postfix: "kg" },
    { name: "Height", value: pokemon?.height, postfix: "m" },
    { name: "Abilities", values: pokemon?.abilities, postfix: "" },
    {
      name: "Status",
      postfix: "",
      value: getIsAlreadyCaughtPokemon(pokemon.id) ? "Catched" : "",
    },
  ];

  return (
    <Box width={"100%"}>
      <ButtonBase onClick={handleClickBackToSearch}>
        <Box fontWeight={600} display={"flex"} alignItems={"center"}>
          <ArrowBack />
          Back to search
        </Box>
      </ButtonBase>
      <Grid container sx={{ alignItems: "center" }}>
        <Grid item xs={12} sm={6} p={2}>
          <NextImage
            priority
            width={400}
            height={300}
            style={{
              maxWidth: "100%",
              height: "auto",
              border:
                "3px solid " +
                (getIsAlreadyCaughtPokemon(pokemon.id)
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main),
            }}
            alt={pokemon?.name + "-profile-image"}
            src={pokemon?.imageUrl || ""}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          {attributes.map((attribute, i) => {
            return (
              <Grid
                container
                p={2}
                key={i}
                bgcolor={
                  i % 2 == 0
                    ? theme.palette.primary.light
                    : theme.palette.secondary.light
                }
              >
                <Grid item xs={6}>
                  {attribute.name}
                </Grid>
                <Grid item xs={6}>
                  {attribute.value
                    ? attribute.value + attribute.postfix
                    : attribute?.values?.map(
                        (ability, i) =>
                          !ability.is_hidden && (
                            <Box key={i}>{ability.ability.name}</Box>
                          )
                      )}
                </Grid>
              </Grid>
            );
          })}

          <Button
            sx={{
              mt: theme.spacing(3),
            }}
            onClick={() => handleClickCatchReleaseButton(pokemon.id)}
            fullWidth
            color={
              getIsAlreadyCaughtPokemon(pokemon.id) ? "secondary" : "primary"
            }
            variant="contained"
          >
            {getIsAlreadyCaughtPokemon(pokemon.id) ? "Release" : "Catch"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
