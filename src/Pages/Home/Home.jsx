// Example of updated Home.jsx with dark mode classes

import { useState } from "react";
import dish from "../../assets/hero-img.png";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  async function getAllMeals() {
    const options = {
      url: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
      method: "GET",
    };
    return await axios.request(options);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["meals"],
    queryFn: getAllMeals,
  });

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <p className="text-red-500 font-bold">
          Error: {error.message || "Something went wrong!"}
        </p>
      </div>
    );

  const meals = data?.data?.meals || [];

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="home container-fluid grid bg-slate-200 dark:bg-gray-900 dark:text-white">
      <div className="container flex flex-col md:flex-row items-center justify-center gap-5 py-10 min-h-screen">
        <div className="contentHome space-y-5">
          <h1 className="text-6xl font-bold">
            Enjoy Your Healthy <br /> Delicious Food
          </h1>
          <p className="p-3 text-gray-700 dark:text-gray-300">
            Sed autem laudantium dolores. Voluptatem itaque ea consequatur
            eveniet. Eum quas beatae cumque eum quaerat. Book a Table
          </p>
          <div className="buttons flex space-x-6">
            <Link
            to={'/contact'}
            className="btn rounded-tl-none rounded-2xl bg-lime-600 text-white hover:bg-lime-700">
              Leave A Message
            </Link>
            <a href="https://www.youtube.com/" target="_blank" className="flex items-center">
              <span className="flex items-center bg-red-600 mr-2 text-white justify-center w-8 h-8 rounded-full">
                <i className="fa-solid fa-play"></i>
              </span>
              <span className="font-semibold">Watch a Video</span>
            </a>
          </div>
        </div>
        <div className="homeImg mt-2 md:mt-0">
          <img
            src={dish}
            alt="dish"
            className="drop-shadow-2xl hover-shake"
          />
        </div>
      </div>

      <h2 className="bg-red-500 text-center text-4xl font-semibold text-white">
        Explore Some Of Our Meals
      </h2>

      <div className="search text-center my-5 px-4">
        <input
          type="search"
          placeholder="Search..."
          className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-lg px-4 py-2 outline-none border border-gray-300 focus:border-lime-600 transition dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="meals grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 container mt-3">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <Link
              to={`/mealdetails/${meal.idMeal}`}
              className="cursor-pointer"
              key={meal.idMeal}
            >
              <div className="image relative group">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <div className="layerImag absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-60 text-white flex items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="font-bold text-3xl ms-5">{meal.strMeal}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-red-500 font-bold flex flex-col dark:text-gray-400 text-xl">
            <span className="text-3xl"><i className="fa-solid fa-face-sad-cry"></i></span>
            No meals With this Name
          </p>
        )}
      </div>
    </section>
  );
}
