import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Product from "./pages/Product/Product";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import UserProfile from "./pages/Profile/Profile";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
