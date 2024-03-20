import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

//App components
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Catalog from "../components/Sections/Catalog";
import About from "../components/About";
import Footer from "../components/Footer";
import Wholesale from "../components/Sections/Wholesale";
import AboutUs from "../components/Sections/AboutUs";
import Login from "../components/Login";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<About />} />
          <Route path="/" element={<Footer />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />

        </Routes>

        <Footer />
      </div>
    );
  }
}

export default App;
