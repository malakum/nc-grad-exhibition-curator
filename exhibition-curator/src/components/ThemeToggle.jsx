import { useTheme } from "../contexts/User";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button className= { `btn ${theme ==="dark" ? "btn-light" : "btn-dark"} border`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};