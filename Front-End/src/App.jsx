import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Test from "./pages/Test";
import Loading from "./components/Loading";
import Manage from "./pages/Manage";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Test />} />
        <Route path="/Loading" element={<Loading />} />
        <Route path="/Manage" element={<Manage />} />
        <Route path="/tes/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
