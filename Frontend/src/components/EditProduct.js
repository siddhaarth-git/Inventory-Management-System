import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProduct = ({ product, onProductUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    stockQuantity: ""
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/products/${formData.id}`, formData);
      onProductUpdated();
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-3">
        <input
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="Product Name"
          className="form-control"
          required
        />
      </div>
      <div className="col-md-3">
        <input
          name="category"
          value={formData.category || ""}
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
          value={formData.price || ""}
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
          value={formData.stockQuantity || ""}
          onChange={handleChange}
          placeholder="Stock Qty"
          className="form-control"
          required
        />
      </div>
      <div className="col-md-2 d-flex gap-2">
        <button type="submit" className="btn btn-success w-50">
          Save
        </button>
        <button type="button" className="btn btn-secondary w-50" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProduct;
