import "./styles/globals.scss";

import { FactsContextProvider } from "@/store/factsContext";

export const metadata = {
  title: "Today I Learned!",
  description: "Everyday is a new day to furthter learn new things!",
  icons: {
    icon: "./images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <FactsContextProvider>
        <body>{children}</body>
      </FactsContextProvider>
    </html>
  );
}
