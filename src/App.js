import React from 'react';
import './App.css';
import 'fontsource-roboto';
import Home from "./pages/Home";
import Layout from "./hoc/Layout";
import { Route, Switch } from "react-router-dom";
import {PATH_ADD_MARKER, PATH_AUTH_LOGIN, PATH_AUTH_REGISTRATION, PATH_HOME} from "./routeList";
import CreateMarker from "./pages/CreateMarker";
import SignIn from "./pages/auth/Login";
import SignUp from "./pages/auth/Registration";

const App = () => {
  return (
      <Layout>
          <Switch>
              <Route exact path={PATH_AUTH_LOGIN} component={SignIn} />
              <Route path={PATH_AUTH_REGISTRATION} component={SignUp} />
              <Route path={PATH_HOME} component={Home} />
              <Route path={PATH_ADD_MARKER} component={CreateMarker} />
          </Switch>
      </Layout>
  )
};

export default App;
