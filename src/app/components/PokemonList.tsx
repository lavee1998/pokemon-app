"use client";

import {
  selectPokemons,
  selectSearchKeyword,
  selectType,
} from "@/lib/features/pokemon/pokemon.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Button, Grid, useTheme } from "@mui/material";
import Link from "next/link";

export default function PokemonList() {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectPokemons);
  const searchKeyword = useAppSelector(selectSearchKeyword);
  const selectedType = useAppSelector(selectType);

  const theme = useTheme();
  console.log({ pokemons });
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
        .filter((pokemon) => pokemon.name.includes(searchKeyword)) //TODO
        .map((pokemon, i) => {
          return (
            <Box key={i}>
              <Link href={"pokemons/" + pokemon.id}>
                <Grid container mb={2}>
                  <Grid item xs={9} pr={1}>
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
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant={"contained"}>{"Catch"}</Button>
                  </Grid>
                </Grid>
              </Link>
            </Box>
          );
        })}
    </Box>
  );
}
