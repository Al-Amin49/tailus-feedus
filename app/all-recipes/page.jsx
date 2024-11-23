"use client";
import HttpKit from "@/common/helpers/HttpKit";
import RecipeCard from "@/components/Recipes/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getAllRecipes,
  });

  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data]);
  return (
    <div className="pt-20 ">
  
      <div className="relative py-16">
        <div className="container relative m-auto px-6 text-gray-500 md:px-12">
          <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
            {recipes?.map((recipe) => (
              <RecipeCard
                key={recipe?.id}
                recipe={recipe}
               
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;
