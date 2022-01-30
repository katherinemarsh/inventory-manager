import { StrictMode } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import Amplify from "aws-amplify";
import config from "../aws-exports";
import InventoryList from "../InventoryList";
import InventoryDetails from "../InventoryDetails";
Amplify.configure(config);

const App = () => {
  return (
    <div className="p-4">
      <div className="h-16 flex justify-between w-full">
        <div>StockTrack</div>
      </div>
      <Router>
        <Switch>
          <Route path="/inventory/:id">
            <InventoryDetails />
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
