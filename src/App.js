import { Route } from "react-router-dom";
import About from "./Component/About";
import Home from "./Component/Home";

function App() {
  return (
    <div>
      <Route path="/" exact="true" component={Home}></Route>
      <Route path="/about" component={About}></Route>
    </div>
  );
}

export default App;
