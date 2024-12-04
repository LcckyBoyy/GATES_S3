import React from "react";

import AuthorizeView from "../components/AuthorizeView.jsx";
import ManageInventory from "../components/Inventories/ManageInventory.jsx";


function Manage() {

  return (
    <AuthorizeView>
      <ManageInventory />
    </AuthorizeView>
  );
}

export default Manage;
