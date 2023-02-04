import React from 'react'
import { Link } from 'react-router-dom'
import SmallTalkLogo from '../assets/images/small-talk-logo.png'
import '../styles/landing-page.sass'

const LandingPage = () => (
  <main>
    <div className="icon-container">
      <img src={SmallTalkLogo} alt="Small Talk Logo" />
      <h1>Small Talk</h1>
    </div>
    <p className="p-intro">
      Small Talk is a chat application that mainly focus on giving a simple and
      intuitive experience to our users withoutsaturating their view with
      unnecessary features and confusing options.
    </p>
    <button><Link to="/login">Log In</Link></button>
    <p className="p-sign-in">
      Haven't created an account? Then you might want to <Link to="/sign-up">Sign Up</Link>
    </p>
  </main>
)

export default LandingPage
