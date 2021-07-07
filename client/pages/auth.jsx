import React, { Component } from 'react';
import AuthForm from '../components/auth-form';

export default class Auth extends Component {
  render() {
    return (
      <div className="auth-page row-desktop">
        <div className="auth-page-image">
          <div className="hero-image"></div>
        </div>
        <div className="auth-page-form row column-full">
          <div className="auth-page-welcome">
            <h1>Travel Memories</h1>
            <p>Create an account to get started</p>
          </div>
          <AuthForm />
          <div className="auth-page-divider">
            <div className="divider"></div>
            <p>or</p>
            <div className="divider"></div>
          </div>
          <div className="auth-page-text">
            <p>Already have an account? <a>Sign in</a></p>
          </div>
        </div>
      </div>
    );
  }
}
