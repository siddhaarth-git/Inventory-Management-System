import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail'; // Make sure this component exists

function App() {
  return (
    <div>
      <h1 className="text-center mt-3">Smart Inventory</h1>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<ProductList />} />
      </Routes>
    </div>
  );
}

export default App;
