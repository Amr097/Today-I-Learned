import "./styles/globals.scss";
import { Inter } from "next/font/google";
import { FactsContextProvider } from "@/store/factsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Today I Learned!",
  description: "Everyday is a new day to furthter learn new things!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <FactsContextProvider>
        <body className={inter.className}>{children}</body>
      </FactsContextProvider>
    </html>
  );
}
