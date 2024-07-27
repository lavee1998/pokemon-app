export type PokemonType = {
  id: string;
  name: string;
  url: string;
};

export type PokemonTypeResult = {
  name: string;
  url: string;
};

export type PokemonFetchResult = {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonTypeResult[];
};

export type PokemonDetailed = {
  id: string;
  height: number;
  name: string;
  weight: number;
  abilities: {
    ability: PokemonTypeResult;
    is_hidden: false;
  }[];
  imageUrl: string;
  types: {
    types: PokemonTypeResult;
  };
};

export type PokemonDetailedResult = {
  height: number;
  id: string;
  name: string;
  weight: number;
  abilities: {
    ability: PokemonTypeResult;
    is_hidden: false;
  }[];
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
  types: {
    types: PokemonTypeResult;
  };
};

export interface PokemonTypeFetchResult {
  pokemon: { pokemon: PokemonTypeResult }[];
}
