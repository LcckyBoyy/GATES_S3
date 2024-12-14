import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../Loading";

const MySwal = withReactContent(Swal);

function Settings() {
  const { InventoryId } = useParams();
  const [inventoryName, setInventoryName] = useState("");
  const [inventoryDescription, setInventoryDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchInventoryDetails = async () => {
      try {
        const response = await fetch(
          `/Inventory/get?inventoryId=${InventoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch inventory details");
        }

        const data = await response.json();

        if (data.result) {
          setInventoryName(data.result.inventoryName);
          setInventoryDescription(data.result.description);
        }
      } catch (err) {
        setError(err.message);
        MySwal.fire({
          title: "Error!",
          text: "Failed to fetch inventory details",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `/Inventory/access?inventoryId=${InventoryId}`,
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

    Promise.all([fetchInventoryDetails(), fetchUsers()]).finally(() =>
      setIsLoading(false)
    );
  }, [InventoryId]);

  const handleInventoryNameChange = (e) => {
    setInventoryName(e.target.value);
  };

  const handleInventoryDescriptionChange = (e) => {
    setInventoryDescription(e.target.value);
  };

  const handleSaveChanges = async () => {
    const result = await MySwal.fire({
      title: "Save Changes?",
      text: "Are you sure you want to save these changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save changes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch("/Inventory", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inventoryId: InventoryId,
            inventoryName: inventoryName,
            description: inventoryDescription,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update inventory");
        }

        const data = await response.json();

        MySwal.fire({
          title: "Success!",
          text: "Inventory details updated successfully",
          icon: "success",
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        MySwal.fire({
          title: "Error!",
          text: "Failed to update inventory details",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  const handleShareAccess = async () => {
    if (!newUser.email) {
      MySwal.fire({
        title: "Missing Email",
        text: "Please enter an email address.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const confirmResult = await MySwal.fire({
      title: "Share Access?",
      text: `Are you sure you want to grant access to ${newUser.email}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, grant access",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    MySwal.fire({
      title: "Processing...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    try {
      const response = await fetch(
        `/Inventory/access?email=${newUser.email}&InventoryId=${InventoryId}`,
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

      if (data.result === true) {
        const updatedUsersResponse = await fetch(
          `/Inventory/access?inventoryId=${InventoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (updatedUsersResponse.ok) {
          const updatedData = await updatedUsersResponse.json();
          const formattedUsers = updatedData.result.map((user, index) => ({
            id: index + 1,
            name: user.username,
            email: user.email,
          }));
          setUsers(formattedUsers);
        }

        MySwal.fire({
          title: "Access Granted!",
          text: `The user (${newUser.email}) has been granted access to edit your inventory.`,
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        setNewUser({ name: "", email: "" });
        setIsAddUserModalOpen(false);
        return;
      }
    } catch (error) {
      console.error("Share access error:", error);
      MySwal.fire({
        title: "Error!",
        text: "An error occurred while sharing access. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };
  const handleDeleteUser = async (userEmail, userName) => {
    const result = await MySwal.fire({
      title: "Remove User Access?",
      text: `Are you sure you want to remove ${userName}'s access to this inventory?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove access",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `/Inventory/access?inventoryId=${InventoryId}&email=${userEmail}`,
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

        const data = await response.json();
        if (data.result == true) {
          MySwal.fire({
            title: "Removed!",
            text: `${userName}'s access has been removed successfully.`,
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          setUsers(users.filter((user) => user.email !== userEmail));
        }
        if (data.result == false) {
          MySwal.fire({
            title: "Error!",
            text: `${data.message}`,
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      } catch (err) {
        MySwal.fire({
          title: "Error!",
          text: "Failed to remove user access. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <Loading />
      </div>
    );
  }

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
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
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
                      onClick={() => handleDeleteUser(user.email, user.name)}
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
