import { PokemonType, PokemonTypesResult } from "./pokemon.types";

export async function fetchPokemonTypes(): Promise<PokemonType[]> {
  const res = await fetch("https://pokeapi.co/api/v2/type");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const jsonRes: PokemonTypesResult = await res.json();

  return jsonRes.results.map((pokemon, i) => ({
    name: pokemon.name,
    id: i.toString(),
  }));
}
