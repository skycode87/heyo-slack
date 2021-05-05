import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.less";
import { spaRoutes } from "./constants/routes";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Home from "./pages/Home";

import useLoading from "./features/shared/hooks/useLoading";
import global from "./state/global";

export default function CluufApp() {
  const { loader, showLoading, hideLoading } = useLoading();
  global.loader = {
    loader,
    showLoading,
    hideLoading,
  };

  return (
    <div className="cluuf-app">
      <Router>
        <Switch>
          {/*  <Route exact path={spaRoutes.CATEGORIES} component={Categories} />
          <Route exact path={spaRoutes.PRODUCTS} component={Products} />
          */}
          <Route exact path={spaRoutes.LOGIN} component={Login} />
          <Route exact path={spaRoutes.SIGNIN} component={Signin} />
          <Route exact path={spaRoutes.HOME} component={Home} />
        </Switch>
      </Router>
      {loader}
    </div>
  );
}
