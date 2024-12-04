import React, { useState } from "react";

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [muscle, setMuscle] = useState(""); // State for the muscle group input

  const API_KEY = "hjzlZvU+UOh3iHS5V0xDtQ==bKfdRGvsCbVAZlov";

  const fetchExercisesByMuscle = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
      const response = await fetch(apiUrl, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch exercises: ${response.statusText}`);
      }

      const data = await response.json();
      setExercises(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchExercisesByMuscle();
  };

  return (
    <div className="p-5 bg-card rounded-md shadow-lg">
      <h2 className="text-2xl text-primary font-bold mb-4">Exercise List</h2>

      {/* Muscle Group Search */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Enter muscle group (e.g., biceps)"
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
          className="w-full mb-2 p-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-orange-300 transition duration-200"
        >
          Search Exercises
        </button>
      </form>

      {/* Loading and Error States */}
      {loading && <p className="text-white text-center">Loading exercises...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {/* Exercise List */}
      {!loading && exercises.length > 0 && (
        <ul className="space-y-4">
          {exercises.map((exercise, index) => (
            <li key={index} className="bg-dark p-4 rounded-md shadow-md">
              <h3 className="text-xl font-semibold text-white">{exercise.name}</h3>
              <p className="text-sm text-lightText">Category: {exercise.category}</p>
              <p className="text-sm text-lightText">Muscle: {exercise.muscle}</p>
              <p className="text-sm text-lightText">Difficulty: {exercise.difficulty}</p>
              <p className="text-sm text-lightText">{exercise.instructions}</p>
            </li>
          ))}
        </ul>
      )}

      {/* No Results */}
      {!loading && exercises.length === 0 && !error && muscle && (
        <p className="text-white text-center">No exercises found for "{muscle}".</p>
      )}
    </div>
  );
}