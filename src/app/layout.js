import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather App",
  description: "weather application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="cyan"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="red"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@700&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2651137106510803"
          crossorigin="anonymous"
        ></script>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
