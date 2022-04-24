import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "@/lib/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
