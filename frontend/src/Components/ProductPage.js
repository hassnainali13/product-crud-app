import React from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import "../styles.css";

function ProductPage() {
  return (
    <div className="page-container">
      <div className="card form-card">
        <ProductForm />
      </div>

      <div className="card list-card">
        <ProductList />
      </div>
    </div>
  );
}

export default ProductPage;
