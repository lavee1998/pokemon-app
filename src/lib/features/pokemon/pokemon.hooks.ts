import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCaughtPokemonIds, setCaughtPokemonIds } from "./pokemon.slice";

export function useUpdateCaughtPokemonIds() {
  const dispatch = useAppDispatch();
  const caughtPokemonIds = useAppSelector(selectCaughtPokemonIds);

  const updateCaughtPokemonIds = (id: string) => {
    const shouldRemove = caughtPokemonIds.find((pokemonId) => pokemonId == id);
    let result: string[] = [];
    if (shouldRemove) {
      result = caughtPokemonIds.filter((pokemonId) => pokemonId != id);
    } else {
      result = [...caughtPokemonIds, id];
    }
    dispatch(setCaughtPokemonIds(result));
    localStorage.setItem("caughtPokemonIds", JSON.stringify(result));
  };

  return updateCaughtPokemonIds;
}
