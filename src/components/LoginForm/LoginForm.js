import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import "./LoginFrom.scss";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { login, currentUser } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
      // Redirect if already logged in
      if (currentUser) {
        navigate('/user');
      }
    }, [currentUser, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault(); 
        try {
          const response = await axios.post('http://localhost:8080/api/login', {
            email,
            password,
          });
    
         login(response.data.token);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            setErrorMessage('Invalid email or password.');
          } else {
            setErrorMessage('An error occurred. Please try again later.');
          }
        }
      };

    return (
        <div className="login-form">
          <h2 className="login-form__title">Login</h2>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <form className="login-form__content" onSubmit={handleLogin}>
            <div className="login-form__content__line">
              <label className="lable">Email:</label>
              <input
              className="box"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-form__content__line">
              <label className="lable">Password:</label>
              <input
                className="box"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn" type="submit">Login</button>
          </form>
        </div>
      );
}

export default LoginForm;