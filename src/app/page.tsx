import styles from "./page.module.css";
import Box from "@mui/material/Box/Box";
import PokemonTypeSelect from "./components/PokemonTypeSelect";

export default function Home() {
  return (
    <main className={styles.main}>
      <Box display={"flex"}>
        <PokemonTypeSelect />
      </Box>
    </main>
  );
}
