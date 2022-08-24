import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import reportWebVitals from "./reportWebVitals";
import { AppProviders } from "./providers/AppProviders";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AppProviders>
    <Router>
      <Routes></Routes>
    </Router>
  </AppProviders>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
