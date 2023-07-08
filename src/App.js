import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import ProductsList from './components/ProductsList.component';
import AddProduct from "./components/add-product.component";
import EditProduct from "./components/edit-product.component";
import DetailProduct from "./components/detail-product.component";

import "./css/styles.css";


class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/products"} className="navbar-brand">
            Products List
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/products"} className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ProductsList/>} />
            <Route path="/products" element={<ProductsList/>} />
            <Route path="/products/:id" element={<DetailProduct/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/product/edit/:id" element={<EditProduct/>} />
          </Routes>
        </div>        
      </Router>
      );
      }
    }
export default App;
