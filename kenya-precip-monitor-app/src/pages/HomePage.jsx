import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <p className="p-4">Welcome to the Kenya Precipitation Monitor!</p>
    </div>
  );
};

export default HomePage;
