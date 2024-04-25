import { Route, Switch } from "react-router-dom";
import { Login } from "../pages/login";
import Home from "../pages/home";

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
    </Switch>
  );
};

export default AppRoutes;
