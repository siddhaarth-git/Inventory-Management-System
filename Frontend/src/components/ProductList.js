import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products", {
        params: { search, page, size: 5 },
      });
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📦 Smart Inventory</h2>

      <input
        type="text"
        placeholder="Search by name or category"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(0); }}
        className="form-control mb-3"
      />

      {!editingProduct && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Add Product</h5>
            <AddProduct onProductAdded={fetchProducts} />
          </div>
        </div>
      )}

      {editingProduct && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Edit Product</h5>
            <EditProduct
              product={editingProduct}
              onProductUpdated={() => { fetchProducts(); setEditingProduct(null); }}
              onCancel={() => setEditingProduct(null)}
            />
          </div>
        </div>
      )}

      <table className="table table-striped table-bordered shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th>Stock Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td><Link to={`/products/${p.id}`}>{p.name}</Link></td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.stockQuantity}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingProduct(p)}>✏ Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button className="btn btn-primary" onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))} disabled={page >= totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
