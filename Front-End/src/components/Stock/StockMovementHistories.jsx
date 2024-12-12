import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function StockMovementHistories() {
  const { Productid, InventoryId } = useParams();
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStockMovements = async () => {
      try {
        const response = await fetch(
          `/api/StockMovement/read?productId=${Productid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch stock movements");
        }
        const data = await response.json();
        setHistories(data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockMovements();
  }, []);
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-4">
        Product History
      </h2>

      <div className="grid grid-cols-8 gap-4 text-gray-700 font-medium border-b border-gray-200 pb-2">
        <div className="col-span-2">Quantity</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Date</div>
      </div>

      {histories.map((history, index) => (
        <div
          key={history.movementId}
          onClick={() => {
            navigate(`/manage/${InventoryId}/stock/${history.movementId}/edit`);
          }}
          className={`grid grid-cols-8 gap-4 items-center py-3 border-b border-gray-100 hover:cursor-pointer
        ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
        hover:bg-blue-50 transition duration-200`}
        >
          <div
            className={`col-span-2 font-semibold ml-4 ${
              history.movementType === "IN" ? "text-green-600" : "text-red-600"
            }`}
          >
            {history.quantity}
          </div>
          <div className="col-span-2">{history.movementType}</div>
          <div className="col-span-2">
            <span
              className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${
            history.status === "Completed"
              ? "bg-green-100 text-green-800"
              : history.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }
        `}
            >
              {history.status}
            </span>
          </div>
          <div className="col-span-2 text-gray-600">
            {new Date(history.date).toLocaleDateString()}
          </div>
        </div>
      ))}

      {histories.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          No history available for this product
        </div>
      )}
    </div>
  );
}

export default StockMovementHistories;
