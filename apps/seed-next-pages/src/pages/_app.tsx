import "@/styles/globals.css";
import Head from "next/head";
// import theme from "../src/theme";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
// import { AppThemeProvider } from "@org/ui";

// TODO: fetch from @org/ui
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
  },
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    // <AppThemeProvider brand={brand} emotionCache={emotionCache}> </AppThemeProvider>
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppCacheProvider>
  );
}
