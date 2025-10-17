import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <h1 className="font-bold text-lg tracking-wide ">PrecipMonitor KE</h1>
    <div className="flex gap-4 text-sm sm:text-base">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/about" className="hover:underline">About</Link>
    </div>
  </nav>
);

export default Navbar;
