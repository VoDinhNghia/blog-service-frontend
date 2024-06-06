import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/login";
import Home from "./pages/homePage/home";
import PrivateRoute from "./utils/protected-route.util";
import NotFoundPage from "./pages/commons/page-not-found";
import { routes } from "./constants/constant";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import PersonelPage from "./pages/personelPage/index";
import StudySpacePage from "./pages/studySpace";
import TopicPage from "./pages/topic";
import FollowedPage from "./pages/follow/followed";
import FollowingPage from "./pages/follow/following";
import MessagePage from "./pages/messages";

class App extends Component {
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
          <Route
            path={routes.PERSONEL}
            element={
              <PrivateRoute>
                <PersonelPage />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.STUDY_SPACE}
            element={
              <PrivateRoute>
                <StudySpacePage />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.STUDY_SPACE_TOPIC}
            element={
              <PrivateRoute>
                <TopicPage />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.FOLLOWED}
            element={
              <PrivateRoute>
                <FollowedPage />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.FOLLOWING}
            element={
              <PrivateRoute>
                <FollowingPage />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.MESSAGE_PAGE}
            element={
              <PrivateRoute>
                <MessagePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
