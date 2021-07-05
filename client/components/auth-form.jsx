import React, { Component } from 'react';

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'guest',
      password: 'guest'
    };
  }

  render() {
    return (
      <>
        <form className="auth-form">
          <div className="row column-full">
            <label htmlFor="username">Username </label>
            <input
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
              type="username"
              name="username"
              required
            />
          </div>
          <div className="row column-full">
            <label htmlFor="password">Password </label>
            <input
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              type="password"
              name="password"
              required
            />
          </div>
          <div className="row column-full">
            <button type="submit" className="auth-button" >
              Register
            </button>
          </div>
        </form>
      </>
    );
  }
}
