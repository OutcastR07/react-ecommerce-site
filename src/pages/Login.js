import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(username, data.token);
        navigate("/");
      } else {
        console.error("Login failed");
        setError(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
          Sign in to your account
        </h2>
        {error && (
          <div className="text-red-500 mt-2">
            Wrong username or password. Please try again.
          </div>
        )}
        <form onSubmit={handleLogin} className="mt-10 space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Username:
            </label>
            <input
              className="w-full rounded-md py-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border-none focus:outline-none"
              placeholder="Name"
              type="text"
              id="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password:
            </label>
            <input
              className="w-full rounded-md py-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border-none focus:outline-none"
              type="password"
              id="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isLoading}
          >
            {isLoading ? <span>Loading...</span> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
