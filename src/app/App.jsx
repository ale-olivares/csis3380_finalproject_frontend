import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Menu from "../components/Menu";
import About from "../components/About";
import ProductDetail from "../components/Products/ProductDetail";
import Footer from "../components/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div id="home">
                    <Home />
                  </div>

                  <div id="home">
                    <Menu />
                  </div>

                  <div id="About us">
                    <About />
                  </div>
                </>
              }
            />
            <Route path="/product/:productId" element={<ProductDetail userId ="65e8b89bfeef1c905fe9e184"/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
