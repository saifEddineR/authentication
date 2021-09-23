import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../redux/userSlice';

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState({});
  const user = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    dispatch(clearErrors());
    if (user.isAuth) {
      history.push('/profile');
    } else {
      history.push('/login');
    }
  }, [user.isAuth]);

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userInput));
  };
  return (
    <form>
      <input type='email' placeholder='email' name='email' onChange={handleChange} />
      <input
        type='password'
        placeholder='password'
        name='password'
        onChange={handleChange}
      />
      <button type='submit' onClick={handleSubmit}>
        Login
      </button>
      {user && user.loginErrors && <p>{user.loginErrors} </p>}
    </form>
  );
};

export default LoginPage;
