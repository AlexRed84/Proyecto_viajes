import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthProvider } from './shared/context/authContext';


function App() {
  return(

    <Router> 
    <AuthProvider>

    <Header></Header>
  
    <Switch>
  
    <Route path="/login">
    <Login></Login>
    </Route>
    <Route exact path="/">
    <Home></Home>
    </Route>
  
    </Switch>
    </AuthProvider>
    
    </Router>
    
  ); 
  
}

export default App;
