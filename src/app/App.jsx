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
  )
}

export default App
