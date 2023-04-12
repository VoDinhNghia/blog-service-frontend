import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/loginPage/login";
import Home from "./components/homePage/home";
import PrivateRoute from "./common/protectedRoute";
import NotFoundRoute from "./components/notFoundPage/notfoundPage";
import { routes } from "./common/constant";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "hello",
    };
  }

  render() {
    return (
      <div className="AppMain">
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path={routes.HOME}
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundRoute />} />
          </Routes>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
