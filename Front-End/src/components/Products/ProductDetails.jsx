import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

function ProductDetails() {
  const { id } = useParams(); // Extract the dynamic id from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mockup data
    const mockProducts = [
      {
        id: "1",
        name: "Laptop",
        category: "Electronics",
        price: 999.99,
        stock: 50,
        sku: "ELEC-001",
        description: "A high-end laptop with top-notch features.",
        image: "/api/placeholder/50/50",
      },
      {
        id: "2",
        name: "Wireless Mouse",
        category: "Electronics",
        price: 49.99,
        stock: 100,
        sku: "ELEC-002",
        description: "A compact and reliable wireless mouse.",
        image: "/api/placeholder/50/50",
      },
      {
        id: "3",
        name: "Ergonomic Chair",
        category: "Furniture",
        price: 299.99,
        stock: 25,
        sku: "FURN-001",
        description: "An ergonomic office chair for comfortable working.",
        image: "/api/placeholder/50/50",
      },
    ];

    // Simulate data fetching
    const fetchProduct = () => {
      setLoading(true);

      // Simulate network delay
      setTimeout(() => {
        const foundProduct = mockProducts.find((p) => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct(null); // Handle not found case
        }
        setLoading(false);
      }, 500); // Simulate a 500ms delay
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="mb-4" />
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p><strong>SKU:</strong> {product.sku}</p>
      <p><strong>Description:</strong> {product.description}</p>
    </div>
  );
}

export default ProductDetails;
