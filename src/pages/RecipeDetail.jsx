import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

export default function RecipeDetail({
  favourites,
  onToggleFavourite,
}) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecipe() {
      setLoading(true);
      setError("");
      setRecipe(null);

      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/lookup.php",
          {
            params: { i: id },
            signal: controller.signal,
          }
        );

        const meal = response.data.meals?.[0];

        if (!meal) {
          setError("We couldn't find this recipe.");
        } else {
          setRecipe(meal);
        }
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError("Unable to load this recipe. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchRecipe();

    return () => controller.abort();
  }, [id]);

  if (loading) return <Loader />;

  if (error || !recipe) {
    return (
      <div className="empty-state">
        <h2>Recipe unavailable</h2>
        <p>{error || "This recipe could not be found."}</p>
        <Link to="/recipes" className="primary-button">
          Back to recipes ↗
        </Link>
      </div>
    );
  }

  const isFavourite = favourites.some(
    (item) => item.idMeal === recipe.idMeal
  );

  const ingredients = Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;

    return {
      name: recipe[`strIngredient${number}`]?.trim(),
      measure: recipe[`strMeasure${number}`]?.trim(),
    };
  }).filter((item) => item.name);

  return (
    <article className="detail-page">
      <Link to="/recipes" className="back-link">
        ← Back to explore
      </Link>

      <div className="detail-hero">
        <div className="detail-image-wrap">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <span className="detail-image-label">THE GOOD STUFF</span>
        </div>

        <div className="detail-intro">
          <p className="eyebrow">
            {recipe.strCategory || "RECIPE"} /{" "}
            {recipe.strArea || "GLOBAL CUISINE"}
          </p>

          <h1>{recipe.strMeal}</h1>

          <p className="detail-description">
            A dish to bring people together. Gather your ingredients,
            get comfortable, and make something delicious.
          </p>

          <div className="detail-meta">
            <div>
              <span className="meta-label">CATEGORY</span>
              <strong>{recipe.strCategory || "Main dish"}</strong>
            </div>
            <div>
              <span className="meta-label">CUISINE</span>
              <strong>{recipe.strArea || "International"}</strong>
            </div>
            <div>
              <span className="meta-label">INGREDIENTS</span>
              <strong>{ingredients.length} items</strong>
            </div>
          </div>

          <button
            type="button"
            className={`primary-button detail-save ${
              isFavourite ? "saved-button" : ""
            }`}
            onClick={() => onToggleFavourite(recipe)}
          >
            {isFavourite ? "♥ Saved to favourites" : "♡ Save this recipe"}
          </button>

          {recipe.strSource && (
            <a
              className="source-link"
              href={recipe.strSource}
              target="_blank"
              rel="noreferrer"
            >
              Original recipe source ↗
            </a>
          )}
        </div>
      </div>

      <div className="detail-content">
        <section className="ingredients-panel">
          <p className="eyebrow">GET YOUR INGREDIENTS READY</p>
          <h2>The <span className="accent-text">lineup.</span></h2>
          <p className="panel-description">
            Everything you'll need to make this dish.
          </p>

          <ul className="ingredient-list">
            {ingredients.map((ingredient, index) => (
              <li key={`${ingredient.name}-${index}`}>
                <span className="ingredient-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="ingredient-name">{ingredient.name}</span>
                <span className="ingredient-measure">
                  {ingredient.measure || "As needed"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="instructions-panel">
          <p className="eyebrow">LET'S GET COOKING</p>
          <h2>The <span className="accent-text">method.</span></h2>
          <p className="panel-description">
            Take your time. The good stuff is worth it.
          </p>

          <div className="instructions-text">
            {(recipe.strInstructions || "No instructions available.")
              .split(/\r?\n/)
              .map((step) => step.trim())
              .filter(Boolean)
              .map((step, index) => (
                <div className="instruction-step" key={index}>
                  <span className="step-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{step}</p>
                </div>
              ))}
          </div>

          {recipe.strYoutube && (
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="youtube-link"
            >
              ▶ Watch the recipe on YouTube
            </a>
          )}
        </section>
      </div>
    </article>
  );
}