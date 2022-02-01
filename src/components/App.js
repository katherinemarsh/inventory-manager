import { StrictMode } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
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
    <div className="p-4 bg-neutralSecondary">
      <div className="h-16 flex justify-between w-full">
        <div>StockTrack</div>
        <UserAuth />
      </div>
      <Router>
        <Switch>
          <Route path="/inventory/:id">
            <InventoryItems />
            <InventoryEdit />
          </Route>
          <Route path="/inventory/edit/:id">
            <InventoryEdit />
          </Route>
          <Route path="/">
            <InventoryList />
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
