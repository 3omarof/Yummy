import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Pages/Home/Home";
import LayOut from "./Components/Layout/LayOut";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MealDetails from "./Pages/MealDetails/MealDetails";
import Category from "./Pages/Category/Category";
import MealsByCategory from "./Pages/MealsByCategory/MealsByCategory";
import Area from "./Pages/Area/Area";
import MealsArea from "./Pages/MealsArea/MealsArea";
import Ingredients from "./Pages/Ingredients/Ingredients";
import IngredientMeals from "./Pages/ingredientMeals/IngredientMeals";
import Contact from "./Pages/Contact/Contact";
import { Toaster } from "react-hot-toast";
import Loading from "./Components/Loading/Loading";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  const client=new QueryClient()
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        { index: true, element: <Home /> },
        { path: "category", element: <Category /> },
        { path: "area", element: <Area /> },
        { path: "ingredients", element: <Ingredients />},
        { path: "contact", element: <Contact /> },
        { path: "mealdetails/:id", element: <MealDetails /> },
        { path: "category/:name", element: <MealsByCategory /> },
        { path: "area/:name", element: <MealsArea /> },
        { path: "ingredient/:name", element: <IngredientMeals /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster position="top-center" reverseOrder={false}/>
    </>
  );
}

export default App;
