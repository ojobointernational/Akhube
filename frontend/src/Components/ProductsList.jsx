// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Header from "./Header";


// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // API URL
//   const API_URL = 'http://172.105.34.207:8000/api/v1/products/'; // replace with your endpoint

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) throw new Error("Failed to fetch products");

//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <p>Loading products...</p>;
//   if (!products.length) return <p>No products available.</p>;

//   return (
    
//     <div className="product-list">
//       {products.map((product) => (
//         <div
//           key={product.id}
//           className="card"
//           style={{ width: "18rem", margin: "1rem", display: "inline-block" }}
//         >
//           <img
//             src={product.image}
//             alt={product.name}
//             className="card-img-top"
//             style={{ height: "200px", objectFit: "cover" }}
//           />
//           <div className="card-body">
//             <h5 className="card-title">{product.name}</h5>
//             <p className="card-text">{product.description || "No description"}</p>
//             <p className="card-text">
//               Price: ₦{product.price} <br />
//               Stock: {product.stock} <br />
//               Tax: {product.tax_percent}%
//             </p>
//           </div>
//           <Link
//                     to={`/product/${product?.id}`}
//                     className={`btn btn-primary rounded-pill w-100 ${
//                       product?.stock === 0 ? "disabled" : ""
//                     }`}
//                     // Use aria-disabled for accessibility on disabled links
//                     aria-disabled={product?.stock === 0}
//                     tabIndex={product?.stock === 0 ? -1 : undefined}
//                   >
//                     View Details
//                   </Link>
//         </div>
//       ))}
//     </div>
    
//   );
// };

// export default Products;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_SERVER_BASE_URL}/products/`;
  const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL.replace("/api/v1", "");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        console.log("PRODUCT DATA:", data);

        setProducts(data.results ?? data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (!products.length) return <p>No products available.</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="card" style={{ width: "18rem", margin: "1rem" }}>
          <img
            src={`${BASE_URL}${product.image}`}
            alt={product.name}
            style={{ height: "200px", objectFit: "cover" }}
          />

          <div className="card-body">
            <h5>{product.name}</h5>
            <p>{product.description || "No description"}</p>
            <p>₦{product.price}</p>
          </div>

          <Link
            to={`/product/${product.id}`}
            className={`btn btn-primary ${product.stock === 0 ? "disabled" : ""}`}
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Products;

