import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "../theme/createAppTheme";
import { createEmotionCache } from "./createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";

const clientSideEmotionCache = createEmotionCache();

export type AppThemeProviderProps = {
  brand: string;
  emotionCache?: EmotionCache;
  children: React.ReactNode;
};

export function AppThemeProvider({
  brand,
  emotionCache = clientSideEmotionCache,
  children,
}: AppThemeProviderProps) {
  const theme = React.useMemo(() => createAppTheme(brand), [brand]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
