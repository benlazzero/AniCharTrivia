import React from 'react';

import LoginButton from '../components/LoginButton';
import GuestButton from '../components/GuestButton';
import './Login.css';

const Login = () => {
  return (
    <div className="login-wrapper">
      <p>welcome to</p>
      <h1>ANICHAR<br />TRIVIA</h1>
      <LoginButton name="(G) Sign in with Google" />
      <span>OR</span>
      <GuestButton name="Continue as a guest" address="/dashboard/guest" />
    </div>
  )
};

export default Login;
