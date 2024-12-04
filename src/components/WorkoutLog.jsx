import { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard";
import { useAuthentication } from "../services/authService";

export default function WorkoutLog() {
  const user = useAuthentication(); // Get the current authenticated user
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    sets: "",
    reps: "",
    weight: "",
  });

  // Load workouts for the authenticated user
  useEffect(() => {
    if (user) {
      // Use the user's UID to load workouts from localStorage
      const userWorkouts = JSON.parse(localStorage.getItem(`workouts-${user.uid}`)) || [];
      setWorkouts(userWorkouts);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout((prev) => ({ ...prev, [name]: value }));
  };

  const addWorkout = () => {
    if (!user) {
      alert("You must sign in to add workouts.");
      return;
    }

    if (newWorkout.name && newWorkout.sets && newWorkout.reps && newWorkout.weight) {
      const updatedWorkouts = [
        ...workouts,
        {
          ...newWorkout,
          sets: Number(newWorkout.sets),
          reps: Number(newWorkout.reps),
          weight: Number(newWorkout.weight),
        },
      ];

      setWorkouts(updatedWorkouts);

      // Save workouts under the user's UID
      localStorage.setItem(`workouts-${user.uid}`, JSON.stringify(updatedWorkouts));
      setNewWorkout({ name: "", sets: "", reps: "", weight: "" });
    } else {
      alert("Please fill out all fields.");
    }
  };

  if (!user) {
    return <p className="text-center">You must sign in to view and add workouts.</p>;
  }

  return (
    <section>
      <h2 className="text-secondary text-2xl font-bold mb-4">Your Workout Log</h2>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Workout Name"
          value={newWorkout.name}
          onChange={handleInputChange}
          className="border p-2 mr-2 text-black"
        />
        <input
          type="number"
          name="sets"
          placeholder="Sets"
          value={newWorkout.sets}
          onChange={handleInputChange}
          className="border p-2 mr-2 text-black"
        />
        <input
          type="number"
          name="reps"
          placeholder="Reps"
          value={newWorkout.reps}
          onChange={handleInputChange}
          className="border p-2 mr-2 text-black"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (lbs)"
          value={newWorkout.weight}
          onChange={handleInputChange}
          className="border p-2 mr-2 text-black"
        />
        <button onClick={addWorkout} className="bg-blue-500 text-white p-2">
          Add Workout
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout, index) => (
          <WorkoutCard key={index} workout={workout} />
        ))}
      </div>
    </section>
  );
}
