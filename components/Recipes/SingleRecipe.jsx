import HttpKit from "@/common/helpers/HttpKit";
import { AuthContext } from "@/providers/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useContext } from "react";
import { toast } from "sonner";

const SingleRecipe = ({ id, setIsOpen }) => {
  const {addToCart}= useContext(AuthContext);
  
  const { data, isLoading, error } = useQuery({
    //previously id not passing (newly added)
    queryKey: ["recipe-details", id],
    queryFn: () => HttpKit.getRecipeDetails(id),
  });

  const handleAddTOCart=()=>{
    addToCart({ idMeal:data?.idMeal, name: data?.strMeal })
    console.log(`Added to cart: ${data?.strMeal}`);
    toast.success('Cart added')
  }

  //fixed this from !isLoading to isLoading
  if (isLoading) return "Loading...";
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
      <div>
        <Image src={data?.strMealThumb} width={500} height={500} alt="Image" />
      </div>
      <h2 className="text2xl font-semibold">{data?.strMeal}</h2>
      <button 
      onClick={handleAddTOCart}
      className="w-full bg-yellow-300 px-4 py-3 rounded-md">Add to Cart</button>
    </div>
  );
};

export default SingleRecipe;
