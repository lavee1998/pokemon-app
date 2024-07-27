
export type PokemonType = {
  id: string;
  name: string;
};

export type PokemonTypeResult = {
  name: string;
  url: string;
};

export type PokemonTypesResult = {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonTypeResult[];
};
