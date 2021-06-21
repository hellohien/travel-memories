import React from 'react';
import Navbar from '../components/navbar';

export default function Header(props) {
  return (
    <header>
      <a href="#"><h1><i className="logo fa fa-map-marker" aria-hidden="true"></i>TM</h1></a>
      <Navbar/>
    </header>
  );
}
