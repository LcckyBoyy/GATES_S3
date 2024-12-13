import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Loading from "./components/Loading";
import Manage from "./pages/Manage";
import Dashboard from "./pages/Dashboard";
import NoAccess from "./pages/noAccessPage";
import Settings from "./components/Dashboard/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/Loading" element={<Loading />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/manage/:InventoryId/*" element={<Dashboard />} />
        <Route path="/no-access" element={<NoAccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
