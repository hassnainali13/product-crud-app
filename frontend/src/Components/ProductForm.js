import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const categories = [
  "Electronics",
  "Footwear",
  "Clothing",
  "Accessories",
  "Home",
  "Beauty",
  "Toys",
  "Books",
  "Sports",
  "Other"
];

function ProductForm({ fetchProducts }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.category) {
      toast.error("Name, Price, and Category are required!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/products", product);
      toast.success("Product added successfully!");
      setProduct({ name: "", description: "", price: "", category: "" });
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error(err);
      toast.error("Error adding product");
    }
  };

  return (
    <div className="card form-card">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product name"
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product description"
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Product price"
        />

        <label>Category</label>
        <select name="category" value={product.category} onChange={handleChange}>
          <option value="">Select category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
}

export default ProductForm;
