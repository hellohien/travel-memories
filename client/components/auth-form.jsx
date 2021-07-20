import React, { Component } from 'react';

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      invalidLogin: false,
      networkError: false,
      usernameTaken: false
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

  handleSubmit(event) {
    const { path } = this.props.route;
    event.preventDefault();
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
        if (result.error && path === 'signUp') {
          this.setState({ usernameTaken: true });
        } else if (result && path === 'signUp') {
          window.location.hash = '#signIn';
          this.setState({ username: '', password: '' });
        } else if (result.error && path === 'signIn') {
          this.setState({ invalidLogin: true });
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ networkError: true });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSignIn() {
    this.setState({
      username: 'guest',
      password: 'guest',
      invalidLogin: false,
      networkError: false,
      usernameTaken: false
    });
  }

  handleSignOut() {
    this.setState({
      username: '',
      password: '',
      invalidLogin: false,
      networkError: false,
      usernameTaken: false
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

  handleInvalidLogin() {
    return (
      <div className="row column-full error-message">
        <p>Incorrect Username or Password</p>
      </div>
    );
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
          {(this.state.usernameTaken && path === 'signUp') && this.handleUsernameTaken()}
          {this.state.networkError && this.handleNetworkError()}
          {this.state.invalidLogin && this.handleInvalidLogin()}
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
