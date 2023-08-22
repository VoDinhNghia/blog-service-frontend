import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/loginPage";
import Home from "./components/homePage/home";
import PrivateRoute from "./common/protectedRoute";
import NotFoundRoute from "./components/notFoundPage/notfoundPage";
import { routes } from "./common/constant";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import PersonelPage from "./components/personelPage/index";
import StudySpacePage from "./components/studySpace";
import TopicPage from "./components/topicPage";
import FollowedPage from "./components/follow/followedPage";
import FollowingPage from "./components/follow/followingPage";
import MessagePage from "./components/messagePage";

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
          <Route path="*" element={<NotFoundRoute />} />
        </Routes>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
