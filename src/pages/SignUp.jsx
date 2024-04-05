import Head from "../components/Head";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/Login.css'

function SignUp() {

  const [passwordFormData, setPasswordFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    
    if (passwordFormData.password === passwordFormData.confirmPassword) {
      setPasswordsMatch(true);
      fetch(`https://sukoshichat.adaptable.app/signUp`, {
        method: 'Post', 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((response) => {
        console.log(response)
        setMessage(response)
        if (response === "user created") {
          window.location.href = '/';
        }
      })
      .catch((err) => {
        console.log(err.toString());
      });
    } else {
      setPasswordsMatch(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData({
      ...passwordFormData,
      [name]: value
    });
  };


  return (
      <>
          <Head></Head>
          <div className="signUpBody">
              <h1>Sign Up</h1>
              <div className="signUp">
                  <form method="POST" onSubmit={handleSubmit}>
                      <label htmlFor="username">Username</label>
                      <input name="username" placeholder="username" type="text" required/>
                      <label htmlFor="email">Email</label>
                      <input name="email" placeholder="email" type="email" required/>
                      <label htmlFor="password">Password</label>
                      <input name="password" placeholder="password" type="password" value={passwordFormData.password} onChange={handleChange} required/>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input name="confirmPassword" placeholder="password" type="password" value={passwordFormData.confirmPassword} onChange={handleChange} required/>
                      <button>Sign Up</button>
                      {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
                      <p>{message}</p>
                  </form>
                  <div className="flex">
                      <p>Already have an account?</p>
                      <Link to="/">
                          Login
                      </Link>
                  </div>
              </div>
          </div>
      </>
  )
}

export default SignUp