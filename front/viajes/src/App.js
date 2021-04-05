import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Rutas from './pages/Rutas';
import Recover from './pages/RecoverPass';
import Reset from './pages/ResetPass';
import Header from './components/commons/Header';
import Footer from './components/commons/Footer';
import Profile from './pages/Profile';
import AuthUser from './components/security/AuthUser';
import { AuthProvider } from './shared/context/authContext';
import UserProfile from './components/security/UserProfile';
import AuthLogged from './components/security/AuthLogged';
import Validate from './pages/Validateuser';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
            
          </Route>
          <Route exact path="/login">
            <AuthLogged>
              <Login></Login>
              
            </AuthLogged>
          </Route>
          <Route exact path="/register">
            <AuthLogged>
              <Register></Register>
              
            </AuthLogged>
          </Route>
          <Route exact path="/recover">
            <AuthLogged>
              <Recover></Recover>
              
            </AuthLogged>
          </Route>
          <Route exact path="/reset">
            <AuthLogged>
              <Reset></Reset>
              
            </AuthLogged>
          </Route>
          <Route exact path="/users/:id">
            <AuthUser>
              <UserProfile>
                <Profile></Profile>
              
              </UserProfile>
            </AuthUser>
          </Route>
          <Route exact path="/profile/:id">
            <UserProfile>
              <Profile></Profile>
              
              </UserProfile>
                </Route>
          <Route exact path="/Rutas">
            <Rutas></Rutas>
            
          </Route>
          <Route exact path="/users/validate/:id">
            <Validate></Validate>
          </Route>
        </Switch>
        <Footer></Footer>
      </AuthProvider>
    </Router>
  );
}

export default App;
