import React, { useState, useEffect, createContext } from "react";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

export const UserContext = createContext({});

function AuthorizeView(props) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState();

  useEffect(() => {
    let retryCount = 0;
    let maxRetries = 3;
    let delay = 1000;

    function wait(delay) {
      return new Promise((resolve) => setTimeout(resolve, delay));
    }

    async function fetchWithRetry(url, options) {
      try {
        let response = await fetch(url, options);

        if (response.status == 200) {
          console.log("Authorized");
          let j = await response.json();
          setUser({ userId: j.user_Id, email: j.email, username: j.username });
          setAuthorized(true);
          return response;
        } else if (response.Result = false) {
          console.log("Unauthorized");
          return response;
        } else {
          throw new Error("" + response.status);
        }
      } catch (error) {
        retryCount++;
        if (retryCount > maxRetries) {
          throw error;
        } else {
          await wait(delay);
          return fetchWithRetry(url, options);
        }
      }
    }

    fetchWithRetry("/user/pingauth", {
      method: "GET",
    })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    if (authorized && !loading) {
      return (
        <>
          <UserContext.Provider value={user}>
            {props.children}
          </UserContext.Provider>
        </>
      );
    } else {
      return (
        <>
          <Navigate to="/login" />
        </>
      );
    }
  }
}

export default AuthorizeView;
