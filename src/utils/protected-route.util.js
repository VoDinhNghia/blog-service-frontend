import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { routes } from "../constants/constant";

const PrivateRoute = ({ children }) => {
  const user = AuthService.getCurrentUser();
  return user ? children : <Navigate to={routes.LOGIN} />;
};
export default PrivateRoute;
