import cuid from "cuid";
import React, { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function AddProduct() {
  const { InventoryId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    supplier: "",
    price: "",
    stock: "",
    sku: "",
    minimumStock: "",
    description: "",
    unitOfMeasure: "",
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
        productId: cuid(),
        categoryId:
          categories.find((category) => category.name === productData.category)
            ?.id || "",
        inventoryId: InventoryId,
        supplierId:
          suppliers.find((supplier) => supplier.name === productData.supplier)
            ?.id || "",
        productName: productData.name,
        description: productData.description,
        sku: productData.sku,
        unitPrice: parseFloat(productData.price),
        currentStock: parseInt(productData.stock, 10),
        minimumStock: parseInt(productData.minimumStock, 10) || 0,
        unitMeasure: productData.unitOfMeasure,
      };

      const response = await fetch("/Product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const data = await response.json();
      console.log("Product Created:", data);

      MySwal.fire({
        title: "Success!",
        text: "Product created successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(`/manage/${InventoryId}/products`);
      });
    } catch (error) {
      console.error("Error adding product:", error);

      MySwal.fire({
        title: "Error!",
        text: error.message || "An error occurred while creating the product.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 xl:mb-0 mb-16">
      <h1 className="text-xl font-semibold mb-6 text-black border-b-2">
        Add Product
      </h1>

      <form onSubmit={handleSubmit} className="">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                {" "}
                Product Name{" "}
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
                {" "}
                Category{" "}
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
                {" "}
                Price{" "}
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
                {" "}
                Unit of Measure{" "}
              </label>
              <input
                type="text"
                name="unitOfMeasure"
                value={productData.unitOfMeasure}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                {" "}
                Stock Quantity{" "}
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

            <div>
              <div className="mb-2">
                <label className="block text-gray-700 font-bold mb-2">
                  {" "}
                  Supplier{" "}
                </label>
                <select
                  name="supplier"
                  value={productData.supplier}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                {" "}
                SKU{" "}
              </label>
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
                {" "}
                Minimum Stock{" "}
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
            {" "}
            Description{" "}
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/manage/${InventoryId}/products`)}
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
                Save Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
