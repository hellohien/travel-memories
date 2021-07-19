import React, { Component } from 'react';
import AuthForm from '../components/auth-form';
import Redirect from '../components/redirect';

export default class Auth extends Component {
  render() {
    const { user, route, handleSignIn } = this.props;
    if (user) return <Redirect to="#addEntry" />;
    const welcomeMessage = (
      (route.path === 'signIn')
        ? 'Welcome to Travel Memories'
        : 'Create an account to get started'
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
          <AuthForm route={route} onSignIn={handleSignIn}/>
        </div>
      </div>
    );
  }
}
