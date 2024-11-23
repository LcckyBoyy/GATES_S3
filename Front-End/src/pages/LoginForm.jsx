import React, { useState } from "react";
import Loading from "../components/Loading"; // Import the previous bubble loading component

function LoginForm() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate email and passwords
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Clear previous errors
    setError("");
    setIsLoading(true);
    const data = {
      username: username,
      password: password,
      rememberMe: rememberMe,
    };
    const queryString = new URLSearchParams(data).toString();

    fetch(`/user/login?${queryString}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setIsLoading(false);
          if (data.result === true) {
            setIsLogin("Successful Login.");
            window.location.href = "/";
          } else {
            setError("Error Logging In.");
          }
        }, 2000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          console.error(error);
          setError("Error Logging in.");
        }, 2000);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <Loading
            count={4}
            size="w-6 h-6"
            baseColor="bg-white/30"
            activeColor="bg-white"
          />
        </div>
      )}
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Login</h2>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {isLogin && (
            <p className="text-green-500 text-sm text-center">{isLogin}</p>
          )}
          <>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  disabled={isLoading}
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              disabled={isLoading}
            >
              Login
            </button>
          </>
        </form>
        {!isLoading && (
          <div className="text-center text-sm">
            <p className="text-gray-600">
              Don't have an account yet?{" "}
              <a
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
