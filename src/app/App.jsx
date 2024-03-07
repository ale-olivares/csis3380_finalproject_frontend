import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductDetailComponent from '../components/product/ProductDetailComponent'
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Menu from "../components/Menu";
import About from "../components/About";
import Product from "../components/Product";
import Footer from "../components/Footer";

function App() {

  return (
    <>
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

        <div>
          <ProductDetailComponent productId="65e8b8119a2ec477d4239219" userId="65e8b89bfeef1c905fe9e184" />
        </div>

      </main>

      <Footer />

    </>
  )
}

export default App
