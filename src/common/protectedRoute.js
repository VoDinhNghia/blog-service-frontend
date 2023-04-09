import { Navigate } from "react-router-dom";
import AuthService from "../services/authService";
import { routes } from "./constant";

const PrivateRoute = ({ children }) => {
  const user = AuthService.getCurrentUser();
  return user ? children : <Navigate to={routes.LOGIN} />;
};
export default PrivateRoute;
