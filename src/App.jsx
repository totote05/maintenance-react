import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from "./components/app/NavBar";
import Maintenance from "./views/Maintenance";
import Odometer from "./views/Odometer";
import Type from "./views/Type";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Maintenance/>
            </Route>
            <Route path="/type">
              <Type/>
            </Route>
            <Route path="/odometer">
              <Odometer/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
