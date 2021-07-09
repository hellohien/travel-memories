import React, { Component } from 'react';

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      invalidLogin: false,
      networkError: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.usernameTaken = this.usernameTaken.bind(this);
  }

  handleSubmit(event) {
    const { path } = this.props;
    event.preventDefault();
    if (!navigator.onLine) {
      this.setState({ networkError: true });
      return;
    }
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/memories/${path}`, req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          this.setState({ invalidLogin: true });
        } else {
          window.location.hash = '#addEntry';
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  usernameTaken() {
    return (
      <div className="row column-full error-message">
        <p>Username is taken. Please try again.</p>
      </div>
    );
  }

  networkError() {
    return (
      <div className="row column-full error-message">
        <p>Bad request. Please try again later.</p>
      </div>
    );
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { path } = this.props;
    const demoUsername = value => {
      if (path === 'signIn') {
        return 'guest';
      } else {
        return this.state.username;
      }
    };
    const demoPassword = value => {
      if (path === 'signIn') {
        return 'guest';
      } else {
        return this.state.password;
      }
    };
    const accountSubmitButton = (
      (path === 'signIn')
        ? 'Sign In'
        : 'Register'
    );
    return (
      <>
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <div className="row column-full">
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              value={demoUsername(this.value)}
              onChange={this.handleChange}
              type="text"
              required
            />
          </div>
          <div className="row column-full">
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              value={demoPassword(this.value)}
              onChange={this.handleChange}
              type="password"
              required
            />
          </div>
          {(this.state.invalidLogin && path === 'signUp') ? this.usernameTaken() : null}
          {this.state.networkError ? this.networkError() : null}
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
