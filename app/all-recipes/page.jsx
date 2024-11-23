"use client";
import HttpKit from "@/common/helpers/HttpKit";
import Modal from "@/components/Modal";
import RecipeCard from "@/components/Recipes/RecipeCard";
import SingleRecipe from "@/components/Recipes/SingleRecipe";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getAllRecipes,
  });

  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data]);

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  if (isLoading) return <div className="flex items-center justify-center font-bold transition-all duration-200 min-h-screen">Loading recipes...</div>;
  if (error) return <div>Error loading recipes: {error.message}</div>;
  return (
    <>
    <div className="pt-20 ">
 
 <div className="relative py-16">
   <div className="container relative m-auto px-6 text-gray-500 md:px-12">
     <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
       {recipes?.map((recipe) => (
         <RecipeCard
           key={recipe?.id}
           recipe={recipe}
           handleDetailsOpen={handleDetailsOpen}
         />
       ))}
     </div>
   </div>
 </div>
</div>
 {/* Modal*/}
 <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        <SingleRecipe id={recipeId} setIsOpen={setOpenDetails} />
      </Modal>
    </>
  );
};

export default AllRecipes;
