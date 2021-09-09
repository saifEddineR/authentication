import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postNewUser } from '../redux/userSlice';

const RegisterPage = ({ history }) => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({});
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.isAuth) {
      history.push('/profile');
    } else {
      history.push('/register');
    }
  }, [user.isAuth]);
  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewUser(userInput));
  };
  return (
    <form>
      <input
        type='text'
        placeholder='full name'
        name='fullName'
        onChange={handleChange}
      />
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
      {user && user.errors && <p>{user.errors} </p>}
    </form>
  );
};

export default RegisterPage;
