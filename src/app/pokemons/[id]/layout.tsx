"use client";

import { Box, Container } from "@mui/material";
import { useAppDispatch } from "@/lib/hooks";
import { fetchPokemonByIdAsync } from "@/lib/features/pokemon/pokemon.slice";

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: {
    id?: string;
  };
}>) {
  const dispatch = useAppDispatch();

  if (params?.id) dispatch(fetchPokemonByIdAsync(params.id));

  return (
    <Container
      maxWidth={"md"}
      sx={{
        minHeight: "100vh",
        alignItems: "center",
        display: "flex",
      }}
    >
      {children}
    </Container>
  );
}
