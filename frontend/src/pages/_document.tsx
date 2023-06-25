import Document, { Head, Html, Main, NextScript } from "next/document";

import { ColorModeScript } from "@chakra-ui/react";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
        </Head>
        <body>
          <ColorModeScript initialColorMode="dark" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
