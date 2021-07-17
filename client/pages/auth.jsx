import React, { Component } from 'react';
import AuthForm from '../components/auth-form';
import Redirect from '../components/redirect';

export default class Auth extends Component {
  render() {
    const { user, route, handleSignIn } = this.props;
    // if (route.path === '') return <Redirect to="#signIn" />;
    if (user) return <Redirect to="#addEntry" />;
    const welcomeMessage = (
      (route.path === 'signIn')
        ? 'Welcome to Travel Memories'
        : 'Create an account to get started'
    );
    const haveAccount = (
      (route.path === 'signIn')
        ? "Don't have an account?"
        : 'Already have an account?'
    );
    return (
      <div className="auth-page row-desktop">
        <div className="auth-page-image">
          <div className="hero-image"></div>
        </div>
        <div className="auth-page-form row column-full">
          <div className="auth-page-welcome">
            <h1>Travel Memories</h1>
            <p>{welcomeMessage}</p>
          </div>
          <AuthForm path={route.path} onSignIn={handleSignIn}/>
          <div className="auth-page-divider">
            <div className="divider"></div>
            <p>or</p>
            <div className="divider"></div>
          </div>
          <div className="auth-page-text">
            <p>{haveAccount} {route.path === 'signIn'
              ? <a href='#signUp'>Sign Up</a>
              : <a href='#signIn'>Sign In</a>}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
