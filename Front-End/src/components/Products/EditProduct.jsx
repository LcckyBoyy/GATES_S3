import cuid from "cuid";
import React, { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaRegTrashAlt } from "react-icons/fa";

const MySwal = withReactContent(Swal);

function EditProduct() {
  const { InventoryId, Productid } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    supplier: "",
    price: "",
    stock: "",
    sku: "",
    minimumStock: "",
    description: "",
    unitMeasure: "",
  });
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/Category?inventoryId=${InventoryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
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

    const fetchSuppliers = async () => {
      try {
        const response = await fetch(`/Supplier?inventoryId=${InventoryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (Array.isArray(data.result)) {
          const formattedSuppliers = data.result.map((supplier) => ({
            id: supplier.supplierId,
            name: supplier.supplierName,
          }));
          setSuppliers(formattedSuppliers);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
      }
    };

    fetchCategories();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/Product/get?inventoryId=${InventoryId}&productId=${Productid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProductData({
          name: data.result.productName,
          category: data.result.categoryId,
          supplier: data.result.supplierId,
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
        categoryId: productData.category,
        inventoryId: InventoryId,
        supplierId: productData.supplier,
        productName: productData.name,
        description: productData.description,
        sku: productData.sku,
        unitPrice: productData.price,
        currentStock: productData.stock,
        minimumStock: productData.minimumStock || 0,
        unitMeasure: productData.unitMeasure,
      };

      const response = await fetch("/Product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToSubmit),
      });
      console.log(productToSubmit);
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      console.log(response);
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

  const handleDelete = async () => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setIsLoading(true);

      try {
        const response = await fetch(`/Product?inventoryId=${InventoryId}&productId=${Productid}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete Product");
        }

        MySwal.fire({
          title: "Deleted!",
          text: "The Product has been deleted successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate(`/manage/${InventoryId}/products`);
        });
      } catch (error) {
        console.error("Error:", error);

        MySwal.fire({
          title: "Error!",
          text:
            error.message || "An error occurred while deleting the [product].",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-16">
      <h1 className="text-xl font-semibold mb-6 text-black border-b-2">
        Product Edit
      </h1>

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
                  <option key={category.id} value={category.id}>
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
                disabled={true}
                value={productData.stock}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md cursor-not-allowed"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Supplier
              </label>
              <select
                name="supplier"
                value={productData.supplier}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">SKU</label>
              <input
                type="text"
                name="sku"
                value={productData.sku}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
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
          ></textarea>
        </div>

        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={handleDelete}
            className={`flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
              isLoading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white font-bold"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex">
                <span className="animate-pulse">Loading</span>
                <span className="animate-bounce ml-1 inline-block font-bold">
                  . . .
                </span>
              </span>
            ) : (
              <>
                <FaRegTrashAlt size={20} className="mr-2" />
                Delete
              </>
            )}
          </button>
          <div className="flex flex-row gap-2">
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
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
