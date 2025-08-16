import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams(); // get product ID from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stockQuantity: "",
  });
  const [error, setError] = useState(null);

  // Fetch product on mount or when id changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(res.data);
        setFormData({
          name: res.data.name,
          category: res.data.category,
          price: res.data.price,
          stockQuantity: res.data.stockQuantity,
        });
      } catch (err) {
        setError("Failed to load product.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stockQuantity" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/products/${id}`, formData);
      setEditing(false);
      setError(null);
      navigate("/products"); // Redirect to product list after saving
    } catch (err) {
      setError("Failed to update product.");
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return <div>Loading product details...</div>;

  return (
    <div className="container mt-4">
      <h2>Product Detail - ID: {product.id}</h2>

      {!editing ? (
        <div>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price ($):</strong> {product.price}</p>
          <p><strong>Stock Quantity:</strong> {product.stockQuantity}</p>
          <button className="btn btn-primary me-2" onClick={() => setEditing(true)}>
            ✏ Edit
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/products")}>
            ← Back to List
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Price ($)</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Stock Quantity</label>
            <input
              name="stockQuantity"
              type="number"
              value={formData.stockQuantity}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button className="btn btn-success me-2" onClick={handleSave}>
            💾 Save
          </button>
          <button className="btn btn-secondary" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
