import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <div>
      <Link to='/'>Home</Link>
      {user.isAuth ? (
        <Link to='/login' onClick={() => dispatch(logout())}>
          logout
        </Link>
      ) : (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
