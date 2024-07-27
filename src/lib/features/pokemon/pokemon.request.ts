import {
  PokemonType,
  PokemonFetchResult,
  PokemonTypeResult,
  PokemonTypeFetchResult,
  PokemonDetailedResult,
  PokemonDetailed,
} from "./pokemon.types";

function parsePokemonResult(result: PokemonTypeResult) {
  const urlSections = result.url.split("/");
  return {
    name: result.name,
    id: urlSections[urlSections.length - 2],
    url: result.url,
  };
}

function parsePokemonDetailedResult(
  result: PokemonDetailedResult
): PokemonDetailed {
  return {
    ...result,
    imageUrl: result.sprites.other.home.front_default,
  };
}

export async function fetchPokemonTypes(): Promise<PokemonType[]> {
  const res = await fetch(
    "https://pokeapi.co/api/v2/type?limit=100000&offset=0"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const jsonRes: PokemonFetchResult = await res.json();

  return jsonRes.results.map((type) => parsePokemonResult(type));
}

export async function fetchPokemons(): Promise<PokemonType[]> {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const jsonRes: PokemonFetchResult = await res.json();

  return jsonRes.results.map((pokemon) => parsePokemonResult(pokemon));
}

export async function fetchPokemon(id: string): Promise<PokemonDetailed> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const jsonRes: PokemonDetailedResult = await res.json();

  return parsePokemonDetailedResult(jsonRes);
}

export async function fetchPokemonsByType(
  typeId: string
): Promise<PokemonType[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${typeId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const jsonRes: PokemonTypeFetchResult = await res.json();

  return jsonRes.pokemon.map((pokemon) => parsePokemonResult(pokemon.pokemon));
}
