
import { useState } from "react";

function MovieForm() {
    const [preference, setPreference] = useState("");
    const [movies, setMovies] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://127.0.0.1:5000/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ preference }),
            });
            const data = await res.json();
            if (data.movies) {
                setMovies(data.movies);
            } else {
                setMovies(["No recommendations found"]);
            }
        } catch (err) {
            console.error(err);
            setMovies(["Error connecting to backend"]);
        }
    };

    return (
        <div className="form-container">
            <h2>Movie Recommendation</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                    placeholder="Enter movie genre or short description"
                />
                <button type="submit">
                    Get Recommendations
                </button>
            </form>

            <h3>Recommended Movies:</h3>
            <ul>
                {movies.map((m, i) => (
                    <li key={i}>{m}</li>
                ))}
            </ul>

        </div>
    );
}

export default MovieForm;
