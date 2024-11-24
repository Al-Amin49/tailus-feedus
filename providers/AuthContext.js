"use client"
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [cart, setCart] = useState([]);

  // Load user and cart from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedUser) setUser(storedUser);
    if (storedCart) setCart(storedCart || []);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.removeItem("cart"); 
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: "An error occurred." };
    }
  };

  const signUp = async (name, email, phone, password) => {
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.error("Signup failed:", error);
      return { success: false, message: "An error occurred." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCart([]);
  };

  const addToCart = (recipe) => {
    if (user) {
      // TODO: Save cart to the server when logged in
    } else {
        setCart((prevCart) => {
            const updatedCart = [...prevCart, recipe];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
          });
    }
  };

  const removeFromCart = (recipeId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== recipeId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout, cart, addToCart, removeFromCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
