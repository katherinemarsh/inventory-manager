import { StrictMode } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";

import Amplify from "aws-amplify";
import config from "../aws-exports";
import InventoryList from "./InventoryList";
import UserAuth from "./UserAuth";
import InventoryItems from "./InventoryItems";
import InventoryEdit from "./InventoryEdit";
Amplify.configure(config);

const App = () => {
  return (
    <div className="h-screen bg-neutralPrimary">
      <Router>
        <div className="flex">
          <div className="sm:w-3/5 w-full p-4">
            <Link to="/">StockTrack</Link>
          </div>
          <div className="bg-primary w-2/5 sm:block text-right p-4">
            <UserAuth />
          </div>
        </div>
        <Switch>
          <Route path="/inventory/:id">
            <div className="flex h-screen">
              <InventoryItems className="sm:w-3/5 w-full p-4" />
              <InventoryEdit className="w-2/5 sm:hidden" />
            </div>
          </Route>
          <Route path="/inventory/edit/:id">
            <InventoryEdit />
          </Route>
          <Route path="/">
            <div className="flex h-screen justify-between">
              <InventoryList className="sm:w-3/5 w-full" />
              <div className="w-2/5 sm:block bg-primary">Phone image here</div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
