import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";

export default function MealsByCategory() {
  const { name } = useParams();

  async function getMealsByCategory() {
    const options = {
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`,
      method: "GET",
    };
    return await axios.request(options);
  }

  const { isError, data, error, isLoading } = useQuery({
    queryKey: ["mealsByCategory", name],
    queryFn: getMealsByCategory,
  });

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <p className="text-red-500 font-bold dark:text-red-400">
          Error: {error.message || "Something went wrong!"}
        </p>
      </div>
    );

  const meals = data.data.meals;

  return (
    <div className="container py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {meals.map((meal) => (
        <Link
          to={`/mealdetails/${meal.idMeal}`}
          key={meal.idMeal}
          className="rounded-lg shadow hover:-translate-y-3 transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800"
        >
          <div className="image">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full"
            />
            <h3 className="text-center text-lg font-serif text-gray-900 dark:text-gray-200">
              {meal.strMeal}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
