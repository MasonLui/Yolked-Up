// Sidebar.jsx
export default function Sidebar() {
    return (
      <nav className="bg-card min-h-screen w-16 flex flex-col items-center py-4">
        <a href="#home" className="text-primary mb-4 hover:scale-110 transition-transform duration-200">🏠</a>
        <a href="#workouts" className="text-primary mb-4 hover:scale-110 transition-transform duration-200">💪</a>
        <a href="#stats" className="text-primary mb-4 hover:scale-110 transition-transform duration-200">📈</a>
        <a href="#profile" className="text-primary hover:scale-110 transition-transform duration-200">👤</a>
      </nav>
    );
  }
  