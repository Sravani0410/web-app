import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import CreateEditProduct from "./components/CreateEditProduct";
import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/ProductList";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute"; 
import "./App.css"
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navbar/>}/>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/create" element={<CreateEditProduct />} />
          <Route path="/edit/:id" element={<CreateEditProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
