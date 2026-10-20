import { useEffect, useState } from "react";
import axios from "axios";

export default function useRecipes(query = "") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecipes() {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php",
          {
            params: { s: query.trim() },
            signal: controller.signal,
          },
        );

        setData(response.data.meals || []);
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError("We couldn't load recipes. Please try again.");
          setData([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchRecipes();

    return () => controller.abort();
  }, [query]);

  return { data, loading, error };
}
