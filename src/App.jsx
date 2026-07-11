import React from "react";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "./Components/Nav";
import Details from "./Pages/Details";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <>
    <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/details/:id" element={<Details />}/>
          <Route path="*" element={<Home />}/>
      </Routes>
      </main>
    <Footer />
    </>
  );
};

export default App;
