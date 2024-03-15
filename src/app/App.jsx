import React, { Component } from "react";
import { Routes, Route} from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Menu from "../components/Menu";
import About from "../components/About";
import Footer from "../components/Footer";
import DevLogin from "../components/Helpers/DevLogin";
import ShoppingCart from "../components/Purchase/ShoppingCart";
import PaymentSuccess from "../components/Purchase/PaymentSuccess";
import PaymentCanceled from "../components/Purchase/PaymentCanceled";
import Product from "../components/Product";
import ProductDetail from "../components/Products/ProductDetail";
import ProductTable from "../components/Products/ProductTable";



class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <main >
          <Routes>
            <Route path="/" element={
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
            <Route path="/product/:productId" element={<ProductDetail/>} />
            <Route path="/login" element={<DevLogin/>} />
            <Route path="/cart" element={<ShoppingCart/>} />
            <Route path="/checkout-success" element={<PaymentSuccess/>} />
            <Route path="/checkout-cancel" element={<PaymentCanceled/>} />
            <Route path="/products" element={<Product/>} />
            <Route path="/productsTable" element={<ProductTable/>} />
          </Routes>

        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
