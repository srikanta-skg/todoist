import logo from "./logo.svg";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   ); 
// }

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/get-started" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
