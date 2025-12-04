import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-3">
        <Link to="/" className="text-xl font-bold">NyumbaLink</Link>
        <div className="flex items-center gap-2">
          <Link to="/" className="px-3 py-1 rounded hover:bg-gray-100">Home</Link>
          <Link to="/listings" className="px-3 py-1 rounded hover:bg-gray-100">Listings</Link>
          <Link to="/upload" className="px-3 py-1 rounded bg-indigo-600 text-white">Post</Link>
        </div>
      </div>
    </nav>
  );
};
