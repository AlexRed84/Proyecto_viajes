import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';


function App() {
  return(

    <Router> 
    <Header></Header>
  
    <Switch>
  
    <Route path="/login">
    <Login></Login>
    </Route>
    <Route exact path="/">
    <h1>Home</h1></Route>
  
    </Switch>
    
    </Router>
    
  ); 
  
}

export default App;
