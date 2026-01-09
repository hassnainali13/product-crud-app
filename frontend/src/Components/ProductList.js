import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const categories = [
  "All",
  "Electronics",
  "Footwear",
  "Clothing",
  "Accessories",
  "Home",
  "Beauty",
  "Toys",
  "Books",
  "Sports",
  "Other",
];

function ProductList({ products, setProducts }) {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // Filter by search and category
  // old
const filtered = products.filter((p) => { ... });

// new safe version
const filtered = Array.isArray(products) ? products.filter((p) => {
  const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
  const matchesCategory = filterCategory === "All" || p.category === filterCategory;
  return matchesSearch && matchesCategory;
}) : [];


  const visible = showAll ? filtered : filtered.slice(0, 7);

  return (
    <div className="card list-card">
      <h2>Products</h2>

      <div className="search-dropdown">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>${p.price}</td>
              <td>{p.category}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(p._id)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length > 10 && (
        <button className="see-more-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
}

export default ProductList;
