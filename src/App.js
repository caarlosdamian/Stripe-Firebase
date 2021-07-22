import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Singin from "./components/Singin";
import Singup from "./components/Singup";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      const user = {
        uuid: userAuth?.uid,
        email: userAuth?.email,
      };
      if (userAuth) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          {user ? (
            <Route path="/" exact component={Home} />
          ) : (
            <Route path="/" exact component={Singin} />
          )}

          <Route path="/singup" exact component={Singup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
