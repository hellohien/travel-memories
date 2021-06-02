import React from 'react';

export default class SearchBox extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputValue: ''
    };
  }

  render() {
    return (
      <div className="search-box row">
        <input type="text" placeholder="Search"/>
      </div>
    );
  }
}
