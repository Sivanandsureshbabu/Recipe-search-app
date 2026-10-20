import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

export default function Favourites({
  favourites,
  onToggleFavourite,
}) {
  return (
    <section className="listing-page favourites-page">
      <div className="page-intro">
        <p className="eyebrow">
          <span className="orange-dot" /> YOUR PERSONAL COLLECTION
        </p>

        <h1>
          Saved with <span className="accent-text">love.</span>
        </h1>

        <p className="page-description">
          Your little black book of delicious things. All your
          favourite recipes, right here.
        </p>
      </div>

      <div className="results-heading">
        <div>
          <p className="eyebrow">THE KEEPERS</p>
          <h2>
            Your <span className="accent-text">go-to dishes.</span>
          </h2>
        </div>

        <span className="results-count">
          {favourites.length} SAVED
        </span>
      </div>

      {favourites.length > 0 ? (
        <div className="recipe-grid">
          {favourites.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              favourites={favourites}
              onToggleFavourite={onToggleFavourite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state favourites-empty">
          <span className="empty-symbol">♡</span>
          <p className="eyebrow">NOTHING SAVED. YET.</p>
          <h2>Your collection awaits.</h2>
          <p>
            When a recipe catches your eye, tap the heart to keep it here.
          </p>
          <Link to="/recipes" className="primary-button">
            Discover recipes <span>↗</span>
          </Link>
        </div>
      )}
    </section>
  );
}