import { Link } from "react-router-dom";

export default function RecipeCard({
  recipe,
  favourites = [],
  onToggleFavourite,
}) {
  const isFavourite = favourites.some(
    (item) => item.idMeal === recipe.idMeal
  );

  return (
    <article className="recipe-card">
      <Link
        to={`/recipes/${recipe.idMeal}`}
        className="recipe-image-link"
        aria-label={`View ${recipe.strMeal}`}
      >
        <img
          className="recipe-image"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          loading="lazy"
        />

        <span className="image-tag">
          {recipe.strArea || "WORLD CUISINE"}
        </span>
      </Link>

      <button
        type="button"
        className={`heart-button ${isFavourite ? "is-saved" : ""}`}
        onClick={() => onToggleFavourite?.(recipe)}
        aria-label={
          isFavourite ? "Remove from favourites" : "Save to favourites"
        }
        aria-pressed={isFavourite}
      >
        {isFavourite ? "♥" : "♡"}
      </button>

      <div className="recipe-card-content">
        <p className="recipe-eyebrow">
          {recipe.strCategory || "CHEF'S SELECTION"}
        </p>

        <Link
          to={`/recipes/${recipe.idMeal}`}
          className="recipe-title-link"
        >
          <h3>{recipe.strMeal}</h3>
        </Link>

        <div className="recipe-card-bottom">
          <span className="recipe-origin">
            <span className="orange-dot" />
            {recipe.strArea || "Global flavours"}
          </span>

          <Link
            to={`/recipes/${recipe.idMeal}`}
            className="card-arrow"
            aria-label={`Read ${recipe.strMeal} recipe`}
          >
            ↗
          </Link>
        </div>
      </div>
    </article>
  );
}