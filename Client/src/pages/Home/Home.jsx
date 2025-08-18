import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome To Home Page{" "}
        {user ? <span className="text-red-500">{user.username}</span> : <></>}
      </h1>
    </div>
  );
};

export default Home;
