import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function IngredientMeals() {
  const { name } = useParams();

  async function getIngredientMeals() {
    const options = {
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`,
      method: "GET",
    };
    return await axios.request(options);
  }

  const { isError, data, error, isLoading } = useQuery({
    queryKey: ["mealsByIngredient", name],
    queryFn: getIngredientMeals,
  });

  if (isLoading)
    return (
     <Loading />
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-bold">
          Error: {error.message || "Something went wrong!"}
        </p>
      </div>
    );

  const meals = data.data.meals;

  return (
    <div className="container py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {meals.map((meal) => (
        <Link
          to={`/mealdetails/${meal.idMeal}`}
          key={meal.idMeal}
          className="rounded-lg shadow hover:-translate-y-3 transition-all duration-300 overflow-hidden"
        >
          <div className="image">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3 className="text-center text-lg font-serif">{meal.strMeal}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
