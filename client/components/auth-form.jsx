import React, { Component } from 'react';

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'guest',
      password: 'guest',
      invalidLogin: false,
      networkError: false,
      error: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
          if (path === 'signUp') {
            window.location.hash = 'signIn';
          } else if (result.token && result.user) {
            this.props.onSignIn(result);
          } else {
            this.setState({ error: true });
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleUsernameTaken() {
    return (
      <div className="row column-full error-message">
        <p>Username is taken. Please try again.</p>
      </div>
    );
  }

  handleNetworkError() {
    return (
      <div className="row column-full error-message">
        <p>Bad request. Please try again later.</p>
      </div>
    );
  }

  handleError() {
    return (
      <div className="row column-full error-message">
        <p>Incorrect Username or Password</p>
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
        return this.state.username;
      } else {
        this.setState({ username: value });
      }
    };
    const demoPassword = value => {
      if (path === 'signIn') {
        return this.state.password;
      } else {
        this.setState({ password: value });
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
          {(this.state.invalidLogin && path === 'signUp') ? this.handleUsernameTaken() : null}
          {this.state.handleNetworkError ? this.handleNetworkError() : null}
          {this.state.handleError ? this.handleError() : null}
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
