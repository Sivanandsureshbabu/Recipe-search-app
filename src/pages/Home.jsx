import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useRecipes from "../hooks/useRecipes";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";

export default function Home({ favourites, onToggleFavourite }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data, loading, error } = useRecipes("chicken");

  function handleSearch(event) {
    event.preventDefault();
    navigate(`/recipes${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ""}`);
  }

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="orange-dot" />
            YOUR DAILY DOSE OF DELICIOUS
          </div>

          <h1>
            Find your next
            <br />
            <span className="accent-text">food obsession.</span>
          </h1>

          <p className="hero-description">
            Recipes worth staying in for. Discover flavours from
            around the world and bring something extraordinary to
            your everyday table.
          </p>

          <form className="hero-search" onSubmit={handleSearch}>
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="What are you craving?"
              aria-label="Search recipes"
            />
            <button type="submit">Explore <span>↗</span></button>
          </form>

          <div className="hero-note">
            <span className="note-stars">★★★★★</span>
            <span>Made for curious food lovers</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-frame">
            <img
              src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1100&q=85"
              alt="Fresh pasta with herbs and delicious ingredients"
            />
          </div>

          <div className="hero-stamp">
            <span>GOOD FOOD</span>
            <strong>GOOD MOOD.</strong>
            <span className="stamp-star">✳</span>
          </div>

          <div className="hero-image-caption">
            <span>01 / THE ART OF EATING WELL</span>
            <span>EST. 2026</span>
          </div>
        </div>
      </section>

      <section className="category-strip">
        <span className="strip-label">A LITTLE INSPIRATION</span>
        <span>Comfort food <b>✳</b></span>
        <span>Global flavours <b>✳</b></span>
        <span>Weeknight heroes <b>✳</b></span>
        <span>Something sweet <b>✳</b></span>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">HANDPICKED FOR YOU</p>
            <h2>Worth a <span className="accent-text">taste.</span></h2>
          </div>
          <Link to="/recipes" className="text-link">
            Explore all recipes <span>↗</span>
          </Link>
        </div>

        {loading && <Loader />}

        {error && (
          <p className="status-message error-message">{error}</p>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="recipe-grid">
            {data.slice(0, 4).map((recipe) => (
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
          <p className="status-message">
            No recipes available right now. Explore our full collection.
          </p>
        )}
      </section>

      <section className="manifesto">
        <span className="manifesto-symbol">✳</span>
        <p className="eyebrow">OUR LITTLE PHILOSOPHY</p>
        <h2>
          Life is too short
          <br />
          for <span className="accent-text">boring food.</span>
        </h2>
        <p>Try something new. Trust your taste buds. Make a little mess.</p>
        <Link to="/recipes" className="primary-button">
          Let's find your next meal <span>↗</span>
        </Link>
      </section>
    </div>
  );
}