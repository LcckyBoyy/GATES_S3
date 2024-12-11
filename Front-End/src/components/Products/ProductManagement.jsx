import React from "react";
import ProductSidebar from "./ProductSidebar";
import ProductDetails from "./ProductDetails";

function ProductManagement() {
  return (
    <div className="flex mb-16 h-[90%]">
      <ProductSidebar /> 
      <ProductDetails />
    </div>
  );
}

export default ProductManagement;