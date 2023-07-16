import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather App",
  description:
    "Plan your day with our comprehensive weather application that offers hourly and daily forecasts, precipitation information, and more for your location.",
  keywords:
    "to days weather, today's weather forecast, weather, weather application, weather app, global weather app, daily weather forecast, hourly weather forecast",
  author: "Shahriyar Mammadov",
  ogTitle: "I wonder what the weather will be like today?",
  ogDescription:
    "A web page that provides daily, hourly weather forecasts for each city",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@700&display=swap"
          rel="stylesheet"
        />
        <meta name="author" content="Shahriyar Mammadov"></meta>
        <meta name="keywords" content="next.js"></meta>
        <meta
          property="og:title"
          content="I wonder what the weather will be like today?"
        />
        <meta
          property="og:description"
          content="A web page that provides daily, hourly weather forecasts for each city"
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
