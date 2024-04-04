import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext'; 
import "./SignupForm.scss";

function SignupForm() {
    const [formData, setFormData] = useState({
      user_name: '',
      email: '',
      password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth(); 
    const navigate = useNavigate();
  
    // Handle form field changes
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/api/signup', formData);
        const token = response.data.token;
        login(token);
        navigate('/user');
        
        setFormData({
          user_name: '',
          email: '',
          password: '',
        });
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          setErrorMessage(error.response.data);
        } else {
          console.log('Error', error.message);
          setErrorMessage('An error occurred. Please try again later.');
        }
      }
    };
  
    return (
      <div className="signup-form">
        <h2 className="signup-form__title">Sign Up</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form className="signup-form__content" onSubmit={handleSubmit}>
          <div className="signup-form__content__line">
            <label className="signup-lable">Username:</label>
            <input
            className="signup-box"
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-form__content__line">
            <label className="signup-lable">Email:</label>
            <input
            className="signup-box"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-form__content__line">
            <label className="signup-lable">Password:</label>
            <input
            className="signup-box"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="signup-btn" type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
  
  export default SignupForm;