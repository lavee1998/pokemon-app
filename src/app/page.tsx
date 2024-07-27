import styles from "./page.module.css";
import PokemonTypeSelect from "./components/PokemonTypeSelect";
import PokemonList from "./components/PokemonList";
import { Box, Grid } from "@mui/material";
import PokemonTypeTextField from "./components/PokemonSearchTextField";
import CatchedPokemonCheckbox from "./components/CaughtPokemonCheckbox";

export default function Home() {
  return (
    <main className={styles.main}>
      <Grid container>
        <Grid xs={6} item>
          <Box mb={3}>
            <PokemonTypeTextField />
          </Box>
          <Box mb={3}>
            <PokemonTypeSelect />
          </Box>
          <Box>
            <CatchedPokemonCheckbox />
          </Box>
        </Grid>
        <Grid xs={6} item>
          <PokemonList />
        </Grid>
      </Grid>
    </main>
  );
}
