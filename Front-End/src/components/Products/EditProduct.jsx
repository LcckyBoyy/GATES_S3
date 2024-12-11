import cuid from "cuid";
import React, { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function EditProduct() {
  const { InventoryId, Productid } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    sku: '',
    minimumStock: '',
    description: '',
    unitMeasure: ''
});
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/Category/read");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const formattedCategories = data.map((category) => ({
          id: category.categoryId,
          name: category.name,
          description: category.description,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/Product/get?inventoryId=${InventoryId}&productId=${Productid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProductData({
          name: data.result.productName,
          category: data.result.categoryId,
          price: data.result.unitPrice,
          stock: data.result.currentStock,
          sku: data.result.sku,
          minimumStock: data.result.minimumStock,
          description: data.result.description,
          unitMeasure: data.result.unitMeasure,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [Productid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productToSubmit = {
        productId: Productid,
        categoryId:
          categories.find((category) => category.name === productData.category)
            ?.id || "",
        inventoryId: InventoryId,
        productName: productData.name,
        description: productData.description,
        sku: productData.sku,
        unitPrice: productData.price,
        currentStock: productData.stock ,
        minimumStock: productData.minimumStock  || 0,
        unitMeasure: productData.unitMeasure,
      };

      const response = await fetch("/Product/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      console.log(response)
      MySwal.fire({
        title: "Success!",
        text: "Product updated successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(`/manage/${InventoryId}/products`);
      });
    } catch (error) {
      console.error("Error updating product:", error);

      MySwal.fire({
        title: "Error!",
        text: error.message || "An error occurred while updating the product.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Category
              </label>
              <select
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                step="0.01"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Unit of Measure
              </label>
              <input
                type="text"
                name="unitMeasure"
                value={productData.unitMeasure}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">SKU</label>
              <input
                type="text"
                name="sku"
                value={productData.sku}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Minimum Stock
              </label>
              <input
                type="number"
                name="minimumStock"
                value={productData.minimumStock}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() =>
              navigate(`/manage/${InventoryId}/products/${Productid}`)
            }
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`group relative items-center flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
              isLoading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "text-white bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex ">
                <span className="animate-pulse">Loading</span>
                <span className="animate-bounce ml-1 inline-block font-bold">
                  . . .
                </span>
              </span>
            ) : (
              <>
                <FiSave className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;