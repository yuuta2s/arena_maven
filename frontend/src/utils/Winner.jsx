import React from 'react';
import { useLocation } from 'react-router-dom';

const Winner = () => {
  const location = useLocation();
  const { winner } = location.state || {};

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-10 text-center text-green-500">Tournament Winner</h2>
      <div className="flex justify-center items-center h-full bg-gray-900 text-white rounded-lg p-6">
        {winner ? (
          <span className="text-2xl text-green-400">{winner.username} won the tournament!</span>
        ) : (
          <span className="text-2xl text-red-500">No winner found!</span>
        )}
      </div>
    </div>
  );
};

export default Winner;
