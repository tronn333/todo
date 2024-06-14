import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ToDos from "./components/mainpage/mainpage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/todos">
            <ToDos />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
