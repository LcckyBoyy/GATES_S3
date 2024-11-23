import React from "react";
import Layout from "../components/Layout";
import AuthorizeView from "../components/AuthorizeView";

function Test() {
  return (
    <AuthorizeView>
      <Layout>
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="h-[1000px]">asdasd</p>
        </div>
      </Layout>
    </AuthorizeView>
  );
}

export default Test;
