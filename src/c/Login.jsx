import React, { useState } from 'react';

import { getToken } from '../api/getToken';
import { registerUser } from '../api/registerUser';



const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const data = await getToken(username, password)

    if (data && data.access_token) {
      setToken(data.access_token);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const data = await registerUser(username, password)
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleSubmit}>entrar</button>
        <button onClick={handleRegister}>registrar</button>
      </form>
    </div>
  );
};

export default Login;