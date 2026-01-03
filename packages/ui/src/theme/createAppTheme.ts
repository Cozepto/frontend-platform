import { createTheme } from "@mui/material/styles";

export function createAppTheme(_brand: string) {
  // v1: hardcoded baseline theme
  // Next: connect @org/tokens and brand presets
  return createTheme({
    spacing: 8,
    shape: { borderRadius: 8 },
    typography: {
      fontFamily:
        "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 8,
          },
        },
      },
    },
  });
}
