import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white py-20">
      <div className="max-w-2xl w-full p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to your Dashboard</h1>
        <p className="text-xl text-gray-600 mb-8">This is a private route. You can only see this if you are authenticated.</p>
        <button 
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-bold transition-colors"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
