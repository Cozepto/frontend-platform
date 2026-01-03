import { createTheme } from "@mui/material/styles";
import { getBrandTokens } from "@org/tokens";

export function createAppTheme(brand: string) {
  const t = getBrandTokens(brand);

  return createTheme({
    spacing: 8,
    shape: {
      borderRadius: t.radius?.md ?? 10,
    },
    typography: {
      fontFamily:
        t.typography?.fontFamily ??
        "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    },
    palette: {
      mode: "light",
      primary: { main: t.color.intent.primary },
      success: { main: t.color.intent.success },
      warning: { main: t.color.intent.warning },
      error: { main: t.color.intent.danger },
      background: {
        default: t.color.surface.sunken ?? t.color.surface.raised,
        paper: t.color.surface.default,
      },
      text: {
        primary: t.color.text.primary,
        secondary: t.color.text.muted,
      },
      divider: t.color.border.default,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: t.color.surface.sunken ?? t.color.surface.raised,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: t.radius?.md ?? 10,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: t.radius?.md ?? 10,
          },
        },
      },
    },
  });
}
