import React, { useState, useEffect } from "react";

const Profile = ({ user, loggedInUserDisplayName }) => {
  // State to manage personal records
  const [personalRecords, setPersonalRecords] = useState({
    deadlift: 0,
    benchPress: 0,
    squat: 0,
  });

  const [newRecord, setNewRecord] = useState({
    deadlift: "",
    benchPress: "",
    squat: "",
  });

  // Load personal records from local storage when the component mounts
  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("personalRecords"));
    if (storedRecords) {
      setPersonalRecords(storedRecords);
    }
  }, []);

  // Update personal records and save to local storage
  const handleUpdateRecords = () => {
    const updatedRecords = {
      deadlift: Number(newRecord.deadlift) || personalRecords.deadlift,
      benchPress: Number(newRecord.benchPress) || personalRecords.benchPress,
      squat: Number(newRecord.squat) || personalRecords.squat,
    };
    setPersonalRecords(updatedRecords);
    localStorage.setItem("personalRecords", JSON.stringify(updatedRecords)); // Save to local storage
    setNewRecord({ deadlift: "", benchPress: "", squat: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-primary">Profile</h2>
      <p>Welcome, {user ? loggedInUserDisplayName() : "Guest"}!</p>
      <p>This section can display user details, Personal Records, and more.</p>

      {/* Personal Record Card */}
      <div className="mt-6 flex justify-center">
        <div className="bg-card p-6 rounded-lg shadow-lg mb-4 w-80">
          <h3 className="text-primary font-semibold text-lg">Personal Records</h3>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-white border-b pb-2">
              <span className="font-medium">Deadlift</span>
              <span className="font-semibold">{personalRecords.deadlift} lbs</span>
            </div>
            <div className="flex justify-between text-white border-b pb-2">
              <span className="font-medium">Bench Press</span>
              <span className="font-semibold">{personalRecords.benchPress} lbs</span>
            </div>
            <div className="flex justify-between text-white border-b pb-2">
              <span className="font-medium">Squat</span>
              <span className="font-semibold">{personalRecords.squat} lbs</span>
            </div>
          </div>

          {/* Update Personal Records */}
          <div className="mt-6">
            <h4 className="text-primary font-medium">Update Records</h4>
            <div className="mt-3 space-y-2">
              <input
                type="number"
                name="deadlift"
                placeholder="Deadlift (lbs)"
                value={newRecord.deadlift}
                onChange={handleInputChange}
                className="w-full border rounded p-2 text-gray-700"
              />
              <input
                type="number"
                name="benchPress"
                placeholder="Bench Press (lbs)"
                value={newRecord.benchPress}
                onChange={handleInputChange}
                className="w-full border rounded p-2 text-gray-700"
              />
              <input
                type="number"
                name="squat"
                placeholder="Squat (lbs)"
                value={newRecord.squat}
                onChange={handleInputChange}
                className="w-full border rounded p-2 text-gray-700"
              />
              <button
                onClick={handleUpdateRecords}
                className="mt-4 bg-primary text-white py-2 px-4 rounded-lg shadow hover:bg-primary-dark transition duration-200"
              >
                Update Records
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
