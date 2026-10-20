import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Favourites from "./pages/Favourites";

export default function App() {
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("recipe-favourites") || "[]"
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "recipe-favourites",
      JSON.stringify(favourites)
    );
  }, [favourites]);

  function toggleFavourite(recipe) {
    setFavourites((current) =>
      current.some((item) => item.idMeal === recipe.idMeal)
        ? current.filter((item) => item.idMeal !== recipe.idMeal)
        : [...current, recipe]
    );
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar favouriteCount={favourites.length} />

        <main className="page-container">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  favourites={favourites}
                  onToggleFavourite={toggleFavourite}
                />
              }
            />

            <Route
              path="/recipes"
              element={
                <Recipes
                  favourites={favourites}
                  onToggleFavourite={toggleFavourite}
                />
              }
            />

            <Route
              path="/recipes/:id"
              element={
                <RecipeDetail
                  favourites={favourites}
                  onToggleFavourite={toggleFavourite}
                />
              }
            />

            <Route
              path="/favourites"
              element={
                <Favourites
                  favourites={favourites}
                  onToggleFavourite={toggleFavourite}
                />
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="footer-brand">
            <span className="brand-mark">M</span>
            <span>MIDNIGHT KITCHEN</span>
          </div>
          <p>Good food. Great stories. Your next favourite meal.</p>

            <div className="footer-contact">
             <p> Kerala, India</p>
                <p>
                    ✉️ <a href="mailto:hello@midnightkitchen.com">
                    hello@midnightkitchen.com
                    </a>
                </p>
             <p>
                <a href="tel:+919876543210">+91 98765 43210</a>
            </p>
         </div>

         <span className="footer-copy">
  MADE FOR FOOD LOVERS © 2026
            </span>
        </footer>
      </div>
    </BrowserRouter>
  );
}