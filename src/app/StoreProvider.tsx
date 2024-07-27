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
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializePokemonTypesAsync());
    storeRef.current.dispatch(fetchPokemonsBySelectedTypeAsync());

    //Load caught pokemon ids from local storage
    const caughtPokemonIds = localStorage.getItem("caughtPokemonIds");

    if (caughtPokemonIds && typeof caughtPokemonIds == "string")
      //Set loaded pokemon ids to store
      storeRef.current.dispatch(
        setCaughtPokemonIds(JSON.parse(caughtPokemonIds))
      );
  }

  useEffect(() => {
    if (storeRef.current != null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
