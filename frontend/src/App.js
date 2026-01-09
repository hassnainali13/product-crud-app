import React, { useState, useEffect } from "react";
import ProductForm from "./Components/ProductForm";
import ProductList from "./Components/ProductList";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  const [dark, setDark] = useState(false);
  const [products, setProducts] = useState([]);

 const fetchProducts = async () => {
  try {
const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
setProducts(res.data);
    
    // Ensure res.data is an array
    const productsData = Array.isArray(res.data) ? res.data : res.data.products || res.data.data;
    
    setProducts(productsData);
  } catch (err) {
    console.error(err);
    setProducts([
      { _id: 1, name: "Wireless Mouse", description: "Ergonomic mouse", price: 25, category: "Electronics" },
      { _id: 2, name: "Mechanical Keyboard", description: "RGB keyboard", price: 70, category: "Electronics" },
      { _id: 3, name: "Running Shoes", description: "Lightweight shoes", price: 50, category: "Footwear" },
      { _id: 4, name: "Coffee Mug", description: "Ceramic mug", price: 10, category: "Home & Kitchen" },
      { _id: 5, name: "Notebook", description: "Hardcover notebook", price: 12, category: "Stationery" }
    ]);
  }
};



  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={dark ? "dark" : "light"}>
      <header>
        <button className="dark-btn" onClick={() => setDark(!dark)}>
          {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <div className="layout">
        <ProductForm fetchProducts={fetchProducts} dark={dark} />
        <ProductList
          products={products}
          setProducts={setProducts}
          dark={dark}
        />
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
