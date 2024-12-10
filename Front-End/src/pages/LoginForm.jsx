import React, { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields.',
      });
      return;
    }
    
    setIsLoading(true);

    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        rememberMe: rememberMe,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.result === true) {
          MySwal.fire({
            icon: 'success',
            title: 'Successful Login',
            text: 'Redirecting to manage page...',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            window.location.href = "/manage";
          });
        } else {
          MySwal.fire({
            icon: 'error',
            title: 'Opps...',
            text: "The email or password you entered is incorrect.",
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        MySwal.fire({
          icon: 'error',
          title: 'Opps!',
          text: "Something went wrong while logging in. Please try again later.",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Login</h2>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
                isLoading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "text-white bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex ">
                  <span className="animate-pulse">Loading</span>
                  <span className="animate-bounce ml-1 inline-block font-bold">. . .</span>
                </span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account yet?
            <a
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;