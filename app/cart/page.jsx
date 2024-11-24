"use client"
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthContext";

const Cart = () => {
  const { cart, removeFromCart } = useContext(AuthContext);
  console.log('cart', cart)

  return (
    <div className="bg-gray-50  pt-20">
      <div className="container w-full text-center ">
        <h1 className="text-4xl mb-6">Your Cart</h1>
        {cart?.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart?.map((item) => (
              <li
                key={item.id}
                className="flex justify-center  space-x-20 items-center mb-4"
              >
                <div>
                  <h2 className=" text-xl font-semibold">{item.name}</h2>
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
      </div>
    </div>
  );
};

export default Cart;
