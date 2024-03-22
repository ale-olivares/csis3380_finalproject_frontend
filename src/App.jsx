import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import About from "./components/About";
import Product from "./components/Product";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />

      <main>
        <div id="home">
          <Home />
        </div>

        <div id="home">
          <Menu />
        </div>

        <div id="About us">
          <About />
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default App;
