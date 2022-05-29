import { BrowserRouter as Router } from "react-router-dom";
import appStyles from "./App.module.scss";
import Routes from "./features/routes";

function App() {
  return (
    <Router>
      <div className={appStyles.app}>
        <Routes></Routes>
      </div>
    </Router>
  );
}

export default App;
