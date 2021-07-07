import React, { Component } from 'react';

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'guest',
      password: 'guest',
      invalidLogin: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.usernameTaken = this.usernameTaken.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/memories/sign-up', req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          this.setState({ invalidLogin: true });
        } else {
          window.location.hash = 'sign-in';
        }
      })
      .catch(err => {
        console.error(err);
        alert('Bad request. Please try again later.');
      });
  }

  usernameTaken() {
    return (
      <div className="row column-full invalid-login">
        <p>Username is taken. Please try again.</p>
      </div>
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const demoUsername = value => {
      if (window.location.hash === '#signIn') {
        return this.state.username;
      } else {
        return value;
      }
    };
    const demoPassword = value => {
      if (window.location.hash === '#signIn') {
        return this.state.password;
      } else {
        return value;
      }
    };
    const accountSubmitButton = (
      (window.location.hash === 'sign-in')
        ? 'Sign In'
        : 'Register'
    );
    return (
      <>
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <div className="row column-full">
            <label htmlFor="username">Username:</label>
            <input
              value={demoUsername(this.value)}
              onChange={this.handleChange}
              type="username"
              name="username"
              required
            />
          </div>
          <div className="row column-full">
            <label htmlFor="password">Password:</label>
            <input
              value={demoPassword(this.value)}
              onChange={this.handleChange}
              type="password"
              name="password"
              required
            />
          </div>
          {this.state.invalidLogin ? this.usernameTaken() : null}
          <div className="row column-full submit-button-wrapper">
            <button type="submit" className="auth-button">
              {accountSubmitButton}
            </button>
          </div>
        </form>
      </>
    );
  }
}
