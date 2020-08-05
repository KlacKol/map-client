import React from 'react';
import './App.css';
import 'fontsource-roboto';
import Home from "./pages/Home";
import Layout from "./hoc/Layout";
import { Route, Switch } from "react-router-dom";
import {PATH, PATH_ADD_MARKER} from "./routeList";
import CreateMarker from "./pages/CreateMarker";

const App = () => {
  return (
      <Layout>
          <Switch>
              <Route exact path={PATH} component={Home} />
              <Route path={PATH_ADD_MARKER} component={CreateMarker} />
          </Switch>
      </Layout>
  )
};

export default App;
