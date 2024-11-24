"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cart, removeFromCart, user } = useContext(AuthContext); 
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    // Check if the token exists in localStorage (or any other logic you use for authentication)
    const token = localStorage.getItem("token");
    if (token) {
      setIsUserLoggedIn(true); // User is logged in
    }
  }, []);

  const handleCartClick = () => {
    if (!isUserLoggedIn) {
      // Show an alert if the user is not logged in
      toast.alert("Please log in to view your cart.");
      router.push("/login"); // Redirect to login page
    }
  };

  return (
    <div className="bg-gray-50 pt-20">
      <div className="container w-full text-center">
        <h1 className="text-4xl mb-6">Your Cart</h1>
        <button
          onClick={handleCartClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          View Cart
        </button>
        {isUserLoggedIn ? (
          <>
            {cart?.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cart?.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-center space-x-20 items-center mb-4"
                  >
                    <div>
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p>{item.description}</p>
                    </div>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p>Please log in to view your cart items.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
