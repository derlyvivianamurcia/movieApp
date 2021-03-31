import React from "react";
import { Switch, Route } from "react-router-dom";
import Principal from "../Pages/Principal.jsx";
import Detalle from "../Pages/Detalle.jsx";
import Login from "../Pages/Login.jsx"
class Routers extends React.Component {
  render() {
    return (
      <div>
        <Route>
          <Switch>
            <Route path='/' exact render={(props) => <Login {...props} Routers = {this}/>} />
            <Route exact path="/principal" component={Principal} />
            <Route exact path="/detalle-movie/:id" component={Detalle} />
          </Switch>
        </Route>
      </div>
    );
  }
}

export default Routers;
