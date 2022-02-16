import { StrictMode } from "react";
import { render } from "react-dom";
import phoneImg from "../images/phone.png";
import emptyPhoneImg from "../images/emptyPhone.png";

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
    <div className="bg-neutralPrimary">
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
            <div className="flex">
              <InventoryItems className="sm:w-3/5 w-full p-4" />
              <div className="bg-primary hidden sm:block w-2/5 px-10 py-6">
                <div className="w-380 mx-auto">
                  <InventoryEdit />
                </div>
              </div>
            </div>
          </Route>
          <Route path="/edit/:id">
            <InventoryEdit />
          </Route>
          <Route path="/">
            <div className="flex justify-between">
              <div className="w-3/5">
                <h1 className="text-7xl">
                  Simple & Quick Inventory Management
                </h1>
                <InventoryList className="sm:w-3/5 w-full" />
              </div>
              <div className="w-2/5 sm:block bg-primary">
                <img src={phoneImg} />
              </div>
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
