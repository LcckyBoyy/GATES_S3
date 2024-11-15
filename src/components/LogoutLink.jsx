import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutLink() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/user/logout", {
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
  return <button onClick={handleSubmit}>Logout</button>;
}

export default LogoutLink;
