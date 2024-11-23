"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import Modal from "../Modal";
import SingleRecipe from "./SingleRecipe";

const RecipesList = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState(""); //fixed from abc to ""
  const [searchQuery, setSearchQuery] = useState(null);
  const [noResults, setNoResults]= useState(false)




  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes", searchQuery], // Include searchQuery in the key
    queryFn: () => {
      // Determine which API to call based on searchQuery
      if (searchQuery) {
        console.log(searchQuery)
        return HttpKit.searchRecipesByName(searchQuery);
      }
      return HttpKit.getTopRecipes();
    },
    onSuccess: (data) => {
      console.log("Fetched data:", data);
      if (data.length === 0) {
        setNoResults(true);
        setRecipes([]);
      } else {
        setNoResults(false);
        setRecipes(data);
      }
    },
    onError: (err) => {
      console.error("Error fetching recipes:", err);
    },
    refetchOnWindowFocus: false, 
  });

  const handleSearch = () => {
    if (!searchInput.trim()) {
      alert("Please enter a search term.");
      return;
    }
    setSearchQuery(searchInput); // Triggers the useQuery refetch
  };

  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data]);

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  if (isLoading) return <div>Loading recipes...</div>;
  if (error) return <div>Error loading recipes: {error.message}</div>;

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mx-8">Top Recipes</h1>
        {/* Search form */}
        <div className="mx-8">
          <form action="" className="w-full mt-12">
            <div className="relative flex p-1 rounded-full bg-white   border border-yellow-200 shadow-md md:p-2">
              <input
                placeholder="Your favorite food"
                className="w-full p-4 rounded-full outline-none bg-transparent "
                type="text"
                //fixed 
                onChange={(e) =>setSearchInput(e.target.value)}
                
              />
              <button
                onClick={handleSearch}
                type="button"
                title="Start buying"
                className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12"
              >
                <span className="hidden text-yellow-900 font-semibold md:block">
                  Search
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 mx-auto text-yellow-900 md:hidden"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className="relative py-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
          {noResults && (
              <div className="animate-fade-in text-center text-red-500 font-semibold">
                <p><span className="font-bold">{searchInput} </span>No recipes found. Please try again.</p>
              </div>
            )}
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
    </div>
  );
};

export default RecipesList;
