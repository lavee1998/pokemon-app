import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";

export default function CaughtPokemonCheckbox() {
  return (
    <FormControlLabel
      control={<Checkbox defaultChecked />}
      label="Only show caught Pokemon"
    />
  );
}
