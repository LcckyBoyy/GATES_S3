import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ""
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`;

const certificateName = "Gates.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (
    0 !==
    child_process.spawnSync(
      "dotnet",
      [
        "dev-certs",
        "https",
        "--export-path",
        certFilePath,
        "--format",
        "Pem",
        "--no-password",
      ],
      { stdio: "inherit" }
    ).status
  ) {
    throw new Error("Could not create certificate.");
  }
}

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "https://localhost:7217";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "^/user/pingauth": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/user/login": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/user/registration": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/user/logout": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Inventory/read": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Inventory/delete": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Inventory/create": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Inventory/give-access": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Product/read": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Product/get": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Product/create": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Product/update": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Category/read": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Category/get": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Category/create": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Category/delete": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Category/update": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Supplier/read": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Supplier/create": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Supplier/delete": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Supplier/update": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/Supplier/get": {
        target: "https://localhost:7156/",
        secure: false,
      },
      "^/api/StockMovement/create": {
        target: "https://localhost:7156/",
        secure: false,
      },
    },
    port: 5173,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    },
  },
});
