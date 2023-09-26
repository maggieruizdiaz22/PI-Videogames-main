import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from './components/Home';
import Form from './components/Form';
import Details from './components/Details';
import axios from 'axios';
axios.defaults.baseURL='https://videogames-pi-main.onrender.com/';

function App() {
  return (
      <BrowserRouter>
    <div className="App"> 
      <Switch>
        <Route exact path="/" component = {LandingPage} />
        <Route path="/home" component = {Home} />
        <Route path="/form" exact component = {Form} />
        <Route path="/videogames/:id" exact component={Details}/>
       </Switch> 
     </div>
    </BrowserRouter>
  );
}

export default App;
