import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Singin from "./components/Singin";
import Singup from "./components/Singup";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { auth } from "./firebase";
function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email
      }
      if (userAuth) {
        console.log(userAuth)
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return unsubscribe
  }, [])
  return (
    <UserContext.Provider value={{user}}>
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
    </UserContext.Provider>
  );
}

export default App;
