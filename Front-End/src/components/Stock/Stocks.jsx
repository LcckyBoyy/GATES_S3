import React from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

function Stocks() {
  const {InventoryId} = useParams();
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-16">
      <div className="flex justify-between items-center p-4 bg-white border-b-[1px]">
        <h2 className="text-xl font-bold">Stocks</h2>
        <button
            onClick={() => navigate(`/manage/${InventoryId}/stock/new`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 transition"
        >
          <FiPlus className="mr-2" /> Add Stocks
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-white border-b-[1px]">
          <tr>
            <th className="p-3 text-left">Product Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
          </tr>
        </thead>
        {/* <tbody>
          {products.map((product) => (
            <tr
              key={product.productId}
              className="border-b hover:bg-gray-100 cursor-pointer"
              //   onClick={() =>
              //     navigate(`/manage/${InventoryId}/products/${product.productId}`)
              //   }
            >
              <td className="p-3">
                <div className="flex items-center space-x-3">
                  <span>{product.productName}</span>
                </div>
              </td>
              <td className="p-3">{product.categoryId}</td>
              <td className="p-3">${product.unitPrice}</td>
              <td className="p-3">{product.currentStock}</td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
}

export default Stocks;
