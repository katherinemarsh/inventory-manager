import { StrictMode } from "react";
import { render } from "react-dom";

const App = () => {
  return (
    <h1>Stock Track</h1>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
