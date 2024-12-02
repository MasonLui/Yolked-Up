import React from "react";

const Profile = ({ user, loggedInUserDisplayName, handleLogNewRecord }) => {
    return (
    <div className="text-center">
    <h2 className="text-2xl font-semibold text-primary">Profile</h2>
    <p>Welcome, {user ? loggedInUserDisplayName() : "Guest"}!</p>
    <p>This section can display user details, Personal Records, and more.</p>
    {/* Personal Record Card */}
    <div className="mt-6 flex justify-center">
        <div className="bg-card p-6 rounded-lg shadow-lg mb-4">
        <h3 className="text-primary font-semibold text-lg">Personal Records</h3>
        <div className="mt-4 space-y-3">
            {user?.personalRecords ? (
            Object.entries(user.personalRecords).map(([exercise, record]) => (
                <div
                key={exercise} className="flex justify-between text-gray-700 border-b pb-2">
                <span className="font-medium capitalize">{exercise}</span>
                <span className="font-semibold">{record} lbs</span>
                </div>
            ))
            ) : (
            <p className="text-lightText">No records yet. Start logging your progress!</p>
            )}
            <button
            onClick={() => handleNewRecord()} // Replace with your actual function
            className="mt-4 bg-primary text-white py-2 px-4 rounded-lg shadow hover:bg-primary-dark transition duration-200">
            New Record
            </button>
        </div>
        </div>
    </div>
    </div>
)}

export default Profile