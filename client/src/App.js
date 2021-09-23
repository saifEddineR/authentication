import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import PostDetails from './pages/PostDetails';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/post/:id' component={PostDetails} />
      </Switch>
    </div>
  );
}

export default App;
