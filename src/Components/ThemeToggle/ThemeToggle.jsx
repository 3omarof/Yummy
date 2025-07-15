import { useEffect, useState } from "react";

export default function ThemeToggle() {
    
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 text-xl rounded-full border border-gray-300 dark:border-white hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
      title="Toggle Dark Mode"
    >
      {darkMode ? (
        <i className="fas fa-moon text-yellow-300"></i>
      ) : (
        <i className="fas fa-sun text-orange-400"></i>
      )}
    </button>
  );
}
