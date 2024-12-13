import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function LogoutLink() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    })
      .then((data) => {
        if (data.ok) {
          navigate("/login");
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <button
      onClick={handleSubmit}
      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
    >
      <MdOutlineLogout className="mr-2" size={16} />
      Logout
    </button>
  );
}

export default LogoutLink;
