import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";

import "./App.css";
import AdminList from "./components/dashboard/Admin";
import UserBoard from "./components/dashboard/UserBoard";
import EditResume from "./components/dashboard/edit";
import CreateResume from "./components/dashboard/addnew";
import DeleteResume from "./components/dashboard/delete";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}
///We define some routes for landing page, register and login. The rest of the routes are privae because of authentication
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            
            <Route exact path="/home" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Switch>
              <PrivateRoute exact path="/UserBoard" component={UserBoard} />
              <PrivateRoute exact path="/Admin" component={AdminList} />
              <PrivateRoute exact path="/edit/:id" component={EditResume} />
              <PrivateRoute exact path="/create" component={CreateResume} />
              <PrivateRoute exact path="/delete/:id" component={DeleteResume} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
