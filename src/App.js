import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Home from "./components/Home";
import Singin from "./components/Singin";
import Singup from "./components/Singup";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Singin} />
          <Route path="/singup" exact component={Singup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
