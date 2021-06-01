import React from 'react';

export default function Header(props) {
  return (
    <header>
      <a href="#addEntry"><h1><i className="logo fa fa-map-marker" aria-hidden="true"></i>TM</h1></a>
      <div>
        <a href="#addEntry">Add Entry</a>
        <a href="#myMemories">My Memories</a>
      </div>
    </header>
  );
}
