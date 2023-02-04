import React from 'react'
import SmallTalkLogo from '../assets/images/small-talk-logo.png'
// import bgImage from '../assets/images/background-login-image.jpg'
import '../styles/signup-page.sass'

const SignUp = () => (
  <div className="login">
    <div className="login-container">
      <div className="login-form-info">
        <img src={SmallTalkLogo} alt="logotipo" />
        <h1 className="lf-titulo">Sign Up to Small Talk</h1>
        <input type="Email" id="Email" name="Email" placeholder="Email" required/>
        <input type="password" id="password" name="password" placeholder="Password" required/>
        <button type="button" className="form-btn-is">Log in</button>
        <span className="login-span">You do not have an account? check in{' '}
          <button type="button" className="link-button">here</button>
        </span>
      </div>
    </div>
  </div>
)

export default SignUp
