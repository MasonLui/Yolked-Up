// WorkoutLog.jsx
import WorkoutCard from './WorkoutCard';

export default function WorkoutLog() {
  const workouts = [
    { name: 'Bench Press', sets: 3, reps: 10, weight: 70 },
    { name: 'Deadlift', sets: 3, reps: 8, weight: 120 },
    { name: 'Squat', sets: 4, reps: 10, weight: 100 },
    // Add more workouts here
  ];

  return (
    <section>
      <h2 className="text-secondary text-2xl font-bold mb-4">Workout Log</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout, index) => (
          <WorkoutCard key={index} workout={workout} />
        ))}
      </div>
    </section>
  );
}
