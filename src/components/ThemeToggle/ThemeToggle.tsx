import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";

export type ThemeToggleProps = {
  theme: "light" | "dark";
  onToggle: () => void;
};
export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <IconButton onClick={onToggle}>
      {theme === "dark" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

export default ThemeToggle;
