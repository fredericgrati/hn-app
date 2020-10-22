import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Hacker News</title>
          <meta name="name" content="Hacker News" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="hacker news description" />

          <link rel="preconnect" href="https://storage.googleapis.com" />
          <link rel="manifest" href="/manifest.json" />

          <meta name="theme-color" content="#ffffff" />
          <link rel="apple-touch-icon" href="/logo.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="mobile-web-app-capable" content="yes" />

          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, viewport-fit=cover"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
