import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import  { Dashboard } from "./Dashboard/Dashboard"
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Dashboard} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
