import React from 'react';

export default function Header(props) {
  return (
    <header>
      <a href=""><h1><i className="logo fa fa-map-marker" aria-hidden="true"></i>TM</h1></a>
      <a href="">{props.text}</a>
    </header>
  );
}
