import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./features/routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes></Routes>
      </div>
    </Router>
  );
}

export default App;
