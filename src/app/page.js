"use client";
import Facts from "@/Home/Facts/Facts";
import Form from "@/Home/Form/Form";
import Header from "@/Home/Header/Header";
import Nav from "@/Home/Nav/Nav";
import { result } from "@/services/firebase";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log(result);
  }, []);

  return (
    <div className="root">
      <Header />
      <main>
        <Form />
        <Nav />
        <Facts />
      </main>
    </div>
  );
}
