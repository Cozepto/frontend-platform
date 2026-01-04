import "@/styles/globals.css";
import Head from "next/head";
import brand from "../theme/brand";
import type { AppProps } from "next/app";
import { AppThemeProvider } from "@org/ui";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppThemeProvider brand={brand}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </AppThemeProvider>
  );
}
