import { Backdrop, CircularProgress } from "@mui/material";

export default function RootLoader() {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 999 }} open={true}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}
