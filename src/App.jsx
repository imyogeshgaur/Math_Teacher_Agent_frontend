import "./config/awsConfig";  
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./config/AuthContext";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import Home from "./Components/Home/Home"
import ConfirmSignup from "./Components/Auth/Login"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path='/confirm' element={<ConfirmSignup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
