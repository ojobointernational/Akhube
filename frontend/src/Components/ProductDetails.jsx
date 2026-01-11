import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const API_URL = `/api/v1/products/${id}/`;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔹 ADD TO CART FUNCTION
 
const addToCart = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    alert("Please login to add items to cart");
    navigate("/login");
    return;
  }

  try {
    const response = await fetch(
      "/api/v1/cart/add/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",   // force JSON response
          "Authorization": `Bearer ${token}`, // JWT token
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: Number(quantity),
        }),
      }
    );

    const text = await response.text();
    console.log("RAW RESPONSE:", text);  // debug what Django returns

    if (!response.ok) {
      alert("Failed to add to cart: " + text);
      return;
    }

    const data = JSON.parse(text);
    console.log("ADD TO CART RESPONSE:", data);
    alert("Product added to cart ✅");
  } catch (error) {
    console.error("Add to cart error:", error);
    alert("Could not add product to cart");
  }
};



  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
        <Header />
    <div className="container mt-5">
      <div className="row">
        {/* Image */}
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>

        {/* Details */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description || "No description available"}</p>

          <h4>₦{product.price}</h4>
          <p>Stock: {product.stock}</p>

          {/* Quantity */}
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="form-control"
              style={{ width: "120px" }}
            />
          </div>

          {/* Add to Cart Button */}
          <button
            className="btn btn-success"
            disabled={product.stock === 0}
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
