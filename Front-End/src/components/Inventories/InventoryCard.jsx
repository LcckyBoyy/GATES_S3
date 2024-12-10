import React, { useState, useRef, useEffect } from "react";
import { CiMenuKebab, CiEdit, CiTrash } from "react-icons/ci";
import { RiUserSettingsLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ShareAccessModal from "./ShareAccessModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function InventoryCard({
  invName,
  createdDate,
  invId,
  ownerId,
  userId,
  userRole,
  logoUrl,
  onDelete,
  onEdit,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEditClick = () => {
    onEdit({
      invName,
      createdDate,
      invId,
      userRole,
    });
    setIsOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/Inventory/delete?inventoryId=${invId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      if (onDelete) {
        onDelete();
      }

      console.log(`Inventory with ID ${invId} deleted successfully`);
    } catch (error) {
      console.error("Delete inventory error:", error);
    }
    setIsOpen(false);
  };

  const handleDeleteInitiate = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteConfirm();
        MySwal.fire("Deleted!", "Your inventory has been deleted.", "success");
      }
    });
  };

  const handleManageClick = () => {
    navigate(`/manage/${invId}`);
  };
  const handleShareAccess = async (email) => {
    try {
      const response = await fetch(
        `/Inventory/give-access?email=${encodeURIComponent(
          email
        )}&InventoryId=${encodeURIComponent(invId)}`,
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
        text: `The user (${email}) has been granted access to edit your inventory.`,
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-start justify-between w-[656px] mt-2">
      <div className="flex items-center">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${invName} logo`}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            {invName ? invName[0] : ""}
          </div>
        )}
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-800">{invName}</h2>
          <p className="text-gray-500 text-sm">
            Organization created on{" "}
            <span className="font-bold">{createdDate}</span>
          </p>
          <p className="text-gray-500 text-sm">
            Inventory Id: <span className="font-bold">{invId}</span>
          </p>
          <p className="text-gray-500 text-sm">
            You are a {userRole} in this organization
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={handleManageClick}
          className="border-2 border-[#008CFF] hover:bg-blue-500/10 text-[#008CFF] font-semibold py-0.5 px-1 rounded"
        >
          Manage
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-[#008CFF] p-2 bg-slate-100 rounded-lg ml-2 hover:bg-slate-200"
          >
            <CiMenuKebab size={20} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
              <ul className="py-1">
                <li
                  onClick={handleEditClick}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-black flex items-center border-b-[1px]"
                >
                  <CiEdit className="mr-2" /> Edit
                </li>
                <li
                  onClick={
                    userId !== ownerId
                      ? undefined
                      : () => {
                          setIsShareModalOpen(true);
                          setIsOpen(false);
                        }
                  }
                  className={`w-full text-left px-4 py-2 flex items-center border-b-[1px] 
                              ${
                                userId !== ownerId
                                  ? "text-gray-400 cursor-not-allowed opacity-50"
                                  : "hover:bg-gray-100 text-gray-700 hover:text-black cursor-pointer"
                              }`}
                >
                  <RiUserSettingsLine className="mr-2" /> Share Access
                </li>
                <li
                  onClick={
                    userId !== ownerId ? undefined : handleDeleteInitiate
                  }
                  className={`w-full text-left px-4 py-2 flex items-center text-red-500 
                              ${
                                userId !== ownerId
                                  ? "text-gray-400 cursor-not-allowed opacity-50"
                                  : "hover:bg-gray-100 text-gray-700 cursor-pointer hover:text-red-700"
                              }`}
                >
                  <CiTrash className="mr-2" /> Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <ShareAccessModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onSubmit={handleShareAccess}
      />
    </div>
  );
}

export default InventoryCard;
