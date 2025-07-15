import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function Area() {
  async function getAllAreas() {
    const options = {
      url: `https://www.themealdb.com/api/json/v1/1/list.php?a=list`,
      method: "GET",
    };
    return await axios.request(options);
  }

  const { isError, data, error, isLoading } = useQuery({
    queryKey: ["areas"],
    queryFn: getAllAreas,
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

  const areas = data.data.meals;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 container py-6">
      {areas.map((area) => (
        <Link
          key={area.strArea}
          to={`/area/${area.strArea}`}
          className="flex flex-col items-center justify-center bg-slate-100 rounded-lg p-4 hover:shadow-lg hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
        >
          <span className="text-3xl text-red-500 mb-2">
            <i className="fa-solid fa-house-flag"></i>
          </span>
          <h2 className="text-lg font-semibold dark:text-white">{area.strArea}</h2>
        </Link>
      ))}
    </section>
  );
}
