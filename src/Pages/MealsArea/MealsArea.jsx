import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";

export default function MealsArea() {
  const { name } = useParams();

  async function getMealsArea() {
    const options = {
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`,
      method: "GET",
    };
    return await axios.request(options);
  }

  const { isError, data, isLoading, error } = useQuery({
    queryKey: ["MealArea", name],
    queryFn: getMealsArea,
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

  const mealsArea = data.data.meals;

  return (
    <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6">
      {mealsArea.map((meal) => (
        <Link
          to={`/mealdetails/${meal.idMeal}`}
          className="cursor-pointer"
          key={meal.idMeal}
        >
          <div className="relative group overflow-hidden rounded-lg shadow">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-bold text-xl">{meal.strMeal}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
