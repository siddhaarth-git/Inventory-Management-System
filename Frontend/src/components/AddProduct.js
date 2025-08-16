import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stockQuantity: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/products", formData);
      setFormData({ name: "", category: "", price: "", stockQuantity: "" });
      setSuccess("Product added successfully!");
      onProductAdded();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to add product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-2">
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-2">
          <input
            name="stockQuantity"
            type="number"
            min="0"
            value={formData.stockQuantity}
            onChange={handleChange}
            placeholder="Stock Qty"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Adding..." : "➕ Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
