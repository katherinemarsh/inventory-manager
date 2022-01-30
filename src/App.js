import { StrictMode } from "react";
import { render } from "react-dom";

const App = () => {
  return (
    <div className="p-4">
      <div className="h-16 flex justify-between w-full">
        <div>StockTrack</div>
      </div>
    </div>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
