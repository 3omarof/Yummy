import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function Ingredients() {
  async function getAllIngredients() {
    const options = {
      url: "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
      method: "GET",
    };
    return await axios.request(options);
  }

  const { isError, data, error, isLoading } = useQuery({
    queryKey: ["Ingredients"],
    queryFn: getAllIngredients,
  });

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-bold">
          Error: {error.message || "Something went wrong!"}
        </p>
      </div>
    );

  const ingredients = data.data.meals;

  return (
    <div className="container grid grid-cols-2 gap-4 md:grid-cols-4 overflow-hidden py-6">
      {ingredients.slice(0, 20).map((ingredient) => (
        <Link
          key={ingredient.idIngredient}
          to={`/ingredient/${ingredient.strIngredient}`}
          className="text-center flex flex-col items-center justify-center bg-slate-100 dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg hover:bg-slate-200 dark:hover:bg-gray-700 transition"
        >
          <span className="text-3xl text-red-500 mb-2">
            <i className="fa-solid fa-drumstick-bite"></i>
          </span>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {ingredient.strIngredient}
          </h2>
          <p className="line-clamp-3 text-gray-700 dark:text-gray-300">
            {ingredient.strDescription}
          </p>
        </Link>
      ))}
    </div>
  );
}
