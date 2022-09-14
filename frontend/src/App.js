"use strict";

import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";

import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import PrivateRouter from "./components/PrivateRouter";

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const init = () => {
    const jwt = localStorage.getItem("token");
    const myDecodedToken = decodeToken(jwt);
    const isMyTokenExpired = isExpired(jwt);
    if (!isMyTokenExpired && myDecodedToken) {
      setUser(myDecodedToken);
      setToken(jwt);
    } else {
      setToken(null);
      setUser(null);

      return <Redirect to="/" />;
    }
  };

  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    init();
  }, [token]);
  return (
    <Switch>
      <Route path="/dashboard/albums">
        <PrivateRouter
          token={token}
          setToken={setToken}
          setUser={setUser}
          user={user}
        />
      </Route>
      <Route path="/register" exact>
        {!user ? <Register /> : <Redirect to="/dashboard/albums" />}
      </Route>
      <Route path="/" exact>
        {!user ? (
          <Login
            token={token}
            setToken={setToken}
            setUser={setUser}
            user={user}
          />
        ) : (
          <Redirect to="/dashboard/albums" />
        )}
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default App;
