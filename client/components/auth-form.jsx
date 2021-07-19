import React, { Component } from 'react';

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      invalidLogin: false,
      networkError: false,
      error: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    if (window.location.hash === '#signIn') {
      this.setState({ username: 'guest', password: 'guest' });
    }
  }

  handleSignIn() {
    this.setState({ username: 'guest', password: 'guest' });
  }

  handleSignOut() {
    this.setState({ username: '', password: '' });
  }

  handleSubmit(event) {
    const { path } = this.props.route;
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
            window.location.hash = '#addEntry';
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
    const { path } = this.props.route;
    const accountSubmitButton = (
      (path === 'signIn')
        ? 'Sign In'
        : 'Register'
    );
    const haveAccount = (
      (path === 'signIn')
        ? "Don't have an account?"
        : 'Already have an account?'
    );
    return (
      <>
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <div className="row column-full">
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
              required
            />
          </div>
          <div className="row column-full">
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              value={this.state.password}
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
        <div className="auth-page-divider">
          <div className="divider"></div>
          <p>or</p>
          <div className="divider"></div>
        </div>
        <div className="auth-page-text">
          <p>{haveAccount} {path === 'signIn'
            ? <a onClick={this.handleSignOut} href='#signUp'>Sign Up</a>
            : <a onClick={this.handleSignIn} href='#signIn'>Sign In</a>}
          </p>
        </div>
      </>
    );
  }
}
