import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";

export default function MealDetails() {
  const { id } = useParams();

  async function getSpecificMeal() {
    const options = {
      url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      method: "GET",
    };
    return await axios.request(options);
  }

  const { isError, data, isLoading, error } = useQuery({
    queryKey: ["specifyMeal", id],
    queryFn: getSpecificMeal,
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

  const meal = data.data.meals[0];

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="mealDetails grid grid-cols-12 container gap-4 py-20">
        <div className="col-span-12 md:col-span-4">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full rounded shadow-lg"
          />
        </div>

        <div className="col-span-12 md:col-span-8 space-y-3">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
            {meal.strMeal}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">{meal.strInstructions}</p>

          <h3 className="text-xl font-sans text-gray-800 dark:text-gray-300">
            <span className="mr-2 text-slate-400">
              <i className="fa-solid fa-globe"></i>
            </span>
            <span className="font-bold text-lg">Area:</span> {meal.strArea}
          </h3>
          <h3 className="text-xl font-sans text-gray-800 dark:text-gray-300">
            <span className="mr-2 text-slate-400">
              <i className="fa-solid fa-layer-group"></i>
            </span>
            <span className="font-bold">Category:</span> {meal.strCategory}
          </h3>

          <h3 className="font-semibold mt-4 text-xl font-sans text-gray-900 dark:text-gray-100">
            <span className="mr-2 text-slate-400">
              <i className="fa-solid fa-book"></i>
            </span>
            Recipes:
          </h3>

          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2">
            {ingredients.map((ingredient, index) => (
              <div key={index}>
                <p className="py-1 px-1 bg-slate-400 dark:bg-gray-700 rounded-md text-white shadow">
                  {ingredient}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mt-4 text-xl font-sans text-gray-900 dark:text-gray-100">Tags:</h3>
            <div className="buttons flex gap-x-3 mt-3">
              <button className="btn bg-green-600 hover:bg-green-500">
                <a href={meal.strSource} target="_blank" rel="noreferrer">
                  Source
                </a>
              </button>
              <button className="btn">
                <a href={meal.strYoutube} target="_blank" rel="noreferrer">
                  YouTube
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
