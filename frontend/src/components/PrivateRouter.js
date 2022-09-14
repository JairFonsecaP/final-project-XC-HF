import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Dashboard from "../views/Dashboard";

const PrivateRouter = props => {
  if (props.user) {
    return (
      <Switch>
        <Route path="/dashboard/albums">
          <Dashboard
            token={props.token}
            setToken={props.setToken}
            setUser={props.setUser}
            user={props.user}
          />
        </Route>
      </Switch>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default PrivateRouter;
