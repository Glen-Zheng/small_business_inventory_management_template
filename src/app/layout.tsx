import type { Metadata } from "next";
import "../../styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
export const metadata: Metadata = {
  title: "Hi Yogurt",
  description: "Buy the best ingredients from Hi Yogurt",
  icons: [{ rel: "icon", url: "/icon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://kit.fontawesome.com/aaf248f169.js"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body>
        <Provider>
          <div className="main"></div>
          <div className="gradient"></div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
