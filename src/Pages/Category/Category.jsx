// Updated Category.jsx with dark mode support

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function Category() {
  async function getAllCategories() {
    const options = {
      url: "https://www.themealdb.com/api/json/v1/1/categories.php",
      method: "GET",
    };
    return await axios.request(options);
  }

  const { isError, data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
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

  const categories = data.data.categories;

  return (
    <div className="category container grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
      {categories.map((category) => {
        return (
          <div
            key={category.idCategory}
            className="relative group overflow-hidden rounded-lg shadow bg-white dark:bg-gray-800"
          >
            <Link to={`/mealdetails/${category.strCategory}`}>
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="rounded-lg w-full h-48 object-cover"
              />
            </Link>
            <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-80 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">
                {category.strCategory}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
                {category.strCategoryDescription}
              </p>
              <Link
                to={`/category/${category.strCategory}`}
                className="mt-2 inline-block text-red-600 dark:text-red-400 font-medium hover:underline"
              >
                View Meals
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
