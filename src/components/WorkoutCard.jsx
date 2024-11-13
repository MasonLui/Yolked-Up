// WorkoutCard.jsx
export default function WorkoutCard({ workout }) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-lg mb-4">
        <h3 className="text-primary font-semibold text-lg">{workout.name}</h3>
        <p className="text-lightText">Sets: {workout.sets}</p>
        <p className="text-lightText">Reps: {workout.reps}</p>
        <p className="text-lightText">Weight: {workout.weight} kg</p>
      </div>
    );
  }
  