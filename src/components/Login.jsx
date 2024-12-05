import React, { useState } from 'react';
import { useAppContext } from "../contexts/AppContext";
import { getToken } from '../api/getToken';
import { registerUser } from '../api/registerUser';
import '../css/Modal.css';

const Login = () => {
  const { token, setToken } = useAppContext(); // Extraer solo el token del contexto
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  if (token && token != "null") {
    return null
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos vacíos
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    setLoading(true);
    setError(null); // Limpiar errores previos

    try {
      const data = await getToken(username, password);
      if (data && data.access_token) {
        setToken(data.access_token);
        localStorage.setItem('access_token', data.access_token); // Guardar directamente el token recibido
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar campos vacíos
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    setLoading(true);
    setError(null); // Limpiar errores previos

    try {
      const data = await registerUser(username, password);
      if (data && data.access_token) {
        setToken(data.access_token);
        localStorage.setItem('access_token', data.access_token); // Guardar directamente el token recibido
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError("An error occurred while registering.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
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
        {error && <div className="error">{error}</div>} {/* Mostrar mensaje de error */}
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Entrar'}
        </button>
        <button type="button" onClick={handleRegister} disabled={loading}>
          {loading ? 'Loading...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
