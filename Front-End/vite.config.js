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

var port = "https://localhost:7184/"; // # port

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
      "^/user": {
        target: port,
        secure: false,
      },
      "^/user/login": {
        target: port,
        secure: false,
      },
      "^/registration": {
        target: port,
        secure: false,
      },
      "^/user/logout": {
        target: port,
        secure: false,
      },
      "^/Inventory": {
        target: port,
        secure: false,
      },
      "^/Inventory/get": {
        target: port,
        secure: false,
      },
      "^/Inventory/access": {
        target: port,
        secure: false,
      },
      "^/Product": {
        target: port,
        secure: false,
      },
      "^/Product/get": {
        target: port,
        secure: false,
      },
      "^/Category": {
        target: port,
        secure: false,
      },
      "^/Category/get": {
        target: port,
        secure: false,
      },
      "^/Supplier": {
        target: port,
        secure: false,
      },
      "^/Supplier/get": {
        target: port,
        secure: false,
      },
      "^/StockMovement": {
        target: port,
        secure: false,
      },
      "^/api/StockMovement/get": {
        target: port,
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
