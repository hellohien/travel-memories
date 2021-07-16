import React, { Component } from 'react';
import AuthForm from '../components/auth-form';
import Redirect from '../components/redirect';

export default class Auth extends Component {
  render() {
    const { route } = this.props;
    if (route.path === '') return <Redirect to="#signUp" />;
    const welcomeMessage = (
      (route.path === 'sign-in')
        ? 'Welcome to Travel Memories'
        : 'Create an account to get started'
    );
    const haveAccount = (
      (route.path === 'sign-in')
        ? "Don't have an account?"
        : 'Already have an account?'
    );
    const haveAccountLink = (
      (route.path === 'sign-in')
        ? 'Sign Up'
        : 'Sign In'
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
          <AuthForm />
          <div className="auth-page-divider">
            <div className="divider"></div>
            <p>or</p>
            <div className="divider"></div>
          </div>
          <div className="auth-page-text">
            <p>{haveAccount} <a>{haveAccountLink}</a></p>
          </div>
        </div>
      </div>
    );
  }
}
