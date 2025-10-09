import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Rainfall Monitor</h1>

      <div className="space-x-4">
        <button className="bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded">Home</button>
        <button className="bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded">About</button>
      </div>
    </nav>
  );
};

export default Navbar;
