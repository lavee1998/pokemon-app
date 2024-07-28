"use client";

import {
  fetchPokemonsBySelectedTypeAsync,
  initializePokemonTypesAsync,
  setCaughtPokemonIds,
} from "@/lib/features/pokemon/pokemon.slice";
import type { AppStore } from "@/lib/store";
import { makeStore } from "@/lib/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(); //create store on init
    //TODO, avoid loading all types and pokemons if it is not necessary
    storeRef.current.dispatch(initializePokemonTypesAsync()); //fetch pokemon types and load it to store
    storeRef.current.dispatch(fetchPokemonsBySelectedTypeAsync()); //fetch pokemons by type
  }

  useEffect(() => {
    if (storeRef.current != null) {
      //Load caught pokemon ids from local storage
      const caughtPokemonIds = localStorage.getItem("caughtPokemonIds");

      if (caughtPokemonIds && typeof caughtPokemonIds == "string")
        //Set loaded pokemon ids to store
        storeRef.current.dispatch(
          setCaughtPokemonIds(JSON.parse(caughtPokemonIds))
        );

      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
