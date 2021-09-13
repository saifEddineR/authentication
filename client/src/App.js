import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/profile' component={Profile} />
      </Switch>
      <p>welcome to our website</p>
      <h1>GOMYCODE</h1>
    </div>
  );
}

export default App;
