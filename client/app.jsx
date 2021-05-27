import React from 'react';
import NewEntry from './pages/new-entry';
import Header from './pages/header';

export default class App extends React.Component {
  render() {
    return (
    <div className="main-container">
      <Header text="New Entry" />
        <NewEntry />
    </div>
    );
  }
}
