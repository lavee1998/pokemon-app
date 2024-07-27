import { PokemonAPIItem } from "./pokemon.dto";

export type PokemonType = {
  id: string;
  name: string;
  url: string;
};

export type PokemonDetailed = {
  id: string;
  height: number;
  name: string;
  weight: number;
  abilities: {
    ability: PokemonAPIItem;
    is_hidden: false;
  }[];
  imageUrl: string;
  types: {
    types: PokemonAPIItem;
  };
};
