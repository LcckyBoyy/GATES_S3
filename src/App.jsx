import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Home from './pages/Home';
import RegisterForm from './pages/RegisterForm';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
