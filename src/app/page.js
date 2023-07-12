import Facts from "@/Home/Facts/Facts";
import Header from "@/Home/Header/Header";
import Nav from "@/Home/Nav/Nav";
import { FactsContextProvider } from "@/store/factsContext";

export default function Home() {
  return (
    <FactsContextProvider>
      <div className="root">
        <Header />
        <main>
          <Nav />
          <Facts />
        </main>
      </div>
    </FactsContextProvider>
  );
}
