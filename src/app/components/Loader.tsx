"use client";

import { selectStatus } from "@/lib/features/pokemon/pokemon.slice";
import { useAppSelector } from "@/lib/hooks";
import { Backdrop, CircularProgress, useTheme } from "@mui/material";

export default function Loader() {
  const status = useAppSelector(selectStatus);
  const theme = useTheme();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
      open={status === "loading"}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
}
