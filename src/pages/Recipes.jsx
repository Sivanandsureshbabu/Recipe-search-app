import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useRecipes from "../hooks/useRecipes";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";

export default function Recipes({ favourites, onToggleFavourite }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [input, setInput] = useState(query);

  useEffect(() => {
    setInput(query);
  }, [query]);

  const { data, loading, error } = useRecipes(query);

  function handleSubmit(event) {
    event.preventDefault();

    const value = input.trim();

    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  }

  const suggestions = ["Chicken", "Pasta", "Seafood", "Vegetarian"];

  return (
    <section className="listing-page">
      <div className="page-intro">
        <p className="eyebrow">
          <span className="orange-dot" /> THE RECIPE COLLECTION
        </p>
        <h1>
          Your next craving
          <br />
          starts <span className="accent-text">here.</span>
        </h1>
        <p className="page-description">
          From familiar favourites to flavours you've never tried,
          find the dish that speaks to you.
        </p>
      </div>

      <form className="listing-search" onSubmit={handleSubmit}>
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          type="search"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Try chicken, pasta, curry..."
          aria-label="Search recipes"
        />
        <button type="submit">Search recipes ↗</button>
      </form>

      <div className="suggestion-row">
        <span>QUICK SEARCH</span>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className={`suggestion-chip ${
              query.toLowerCase() === suggestion.toLowerCase()
                ? "selected"
                : ""
            }`}
            onClick={() => {
              setInput(suggestion);
              setSearchParams({ q: suggestion });
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="results-heading">
        <div>
          <p className="eyebrow">FRESH FROM THE KITCHEN</p>
          <h2>
            {query ? (
              <>Results for <span className="accent-text">"{query}"</span></>
            ) : (
              <>Explore <span className="accent-text">everything.</span></>
            )}
          </h2>
        </div>
        {!loading && (
          <span className="results-count">
            {data.length} {data.length === 1 ? "RECIPE" : "RECIPES"}
          </span>
        )}
      </div>

      {loading && <Loader />}

      {error && (
        <div className="empty-state">
          <span className="empty-symbol">!</span>
          <h3>Something went wrong</h3>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="recipe-grid">
          {data.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              favourites={favourites}
              onToggleFavourite={onToggleFavourite}
            />
          ))}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="empty-state">
          <span className="empty-symbol">⌕</span>
          <h3>No dishes found.</h3>
          <p>Try a different ingredient or search for another dish.</p>
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              setInput("");
              setSearchParams({});
            }}
          >
            Show all recipes ↗
          </button>
        </div>
      )}
    </section>
  );
}