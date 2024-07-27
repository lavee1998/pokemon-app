"use client";

import { selectStatus } from "@/lib/features/pokemon/pokemon.slice";
import { useAppSelector } from "@/lib/hooks";
import { Backdrop, CircularProgress, LinearProgress } from "@mui/material";

export default function Loader() {
  const status = useAppSelector(selectStatus);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={status === "loading"}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
}
