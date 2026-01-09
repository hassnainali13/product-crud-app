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
    setProducts(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error("Error fetching products:", err);
    setProducts([]); // fallback
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
