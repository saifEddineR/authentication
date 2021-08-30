import { useState } from 'react';

const LoginPage = () => {
  const [userInput, setUserInput] = useState({});
  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInput);
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
    </form>
  );
};

export default LoginPage;
