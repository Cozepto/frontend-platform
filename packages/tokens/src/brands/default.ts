import { BrandTokens } from "../types";

export const defaultBrand: BrandTokens = {
  color: {
    intent: {
      primary: "#2563EB",
      success: "#16A34A",
      warning: "#D97706",
      danger: "#DC2626",
    },
    surface: {
      default: "#FFFFFF",
      raised: "#F9FAFB",
      sunken: "#F3F4F6",
    },
    text: {
      primary: "#111827",
      secondary: "#374151",
      muted: "#6B7280",
      inverse: "#FFFFFF",
    },
    border: {
      default: "#E5E7EB",
      subtle: "#F3F4F6",
      strong: "#D1D5DB",
    },
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
  },
  typography: {
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
};
