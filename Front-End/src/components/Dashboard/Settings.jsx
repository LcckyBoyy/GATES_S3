import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Settings() {
  const { InventoryId } = useParams();
  const [inventoryName, setInventoryName] = useState("My Inventory");
  const [inventoryDescription, setInventoryDescription] = useState(
    "Main inventory for warehouse operations"
  );

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `/Inventory/get-access?inventoryId=${InventoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        // Transform API response to match existing user structure
        const formattedUsers = data.result.map((user, index) => ({
          id: index + 1,
          name: user.username,
          email: user.email,
        }));

        setUsers(formattedUsers);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleInventoryNameChange = (e) => {
    setInventoryName(e.target.value);
  };

  const handleInventoryDescriptionChange = (e) => {
    setInventoryDescription(e.target.value);
  };

  const handleDeleteUser = async (userEmail) => {
    try {
      const response = await fetch(
        `/Inventory/remove-access?inventoryId=${InventoryId}&email=${userEmail}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove user access");
      }
    } catch (err) {
      console.error("Error removing user:", err);
      alert("Failed to remove user. Please try again.");
    }
  };

  const handleShareAccess = async () => {
    try {
      const response = await fetch(
        `/Inventory/give-access?email=${newUser.email}&InventoryId=${InventoryId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.result === false) {
        MySwal.fire({
          title: "User Not Found",
          text: data.message || "The specified user could not be found.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
        return;
      }

      MySwal.fire({
        title: "Access Granted!",
        text: `The user (${newUser.email}) has been granted access to edit your inventory.`,
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: error.message || "An error occurred while sharing access.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p>Loading users...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="p-6 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto mb-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
      <h2 className="text-gray-500 text-sm mb-6">Inventory Configuration</h2>

      {/* Inventory Details Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <FaEdit className="mr-2 text-blue-500" />
          Inventory Details
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inventory Name
            </label>
            <input
              type="text"
              value={inventoryName}
              onChange={handleInventoryNameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={inventoryDescription}
              onChange={handleInventoryDescriptionChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Save Changes
          </button>
        </div>
      </div>

      {/* User Access Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <FaUser className="mr-2 text-green-500" />
          User Access
        </h3>
        <div className="mb-4">
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            <FaPlus className="mr-2" /> Add User
          </button>
        </div>

        {/* User List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteUser(user.email)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h4 className="text-lg font-semibold mb-4">Add New User</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleShareAccess}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
