import './App.css';

import Navibar from './components/Navibar'
import CatsListing from './components/CatsListing'
import CatsDetail from './components/CatsDetail'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
        <Navibar />
        <Switch>
          <Route exact path="/detail/:breed_name" component={CatsDetail} />
          <Route exact path="/filter/:breed_id" component={CatsListing} />
          <Route exact path="/" component={CatsListing} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;



