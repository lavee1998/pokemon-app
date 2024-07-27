export type PokemonAPIFetchResult = {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonAPIItem[];
};

export type PokemonAPIItem = {
  name: string;
  url: string;
};

export type PokemonDetailedFetchResult = {
  height: number;
  id: string;
  name: string;
  weight: number;
  abilities: {
    ability: PokemonAPIItem;
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
    types: PokemonAPIItem;
  };
};

export interface PokemonTypeFetchResult {
  pokemon: { pokemon: PokemonAPIItem }[];
}
