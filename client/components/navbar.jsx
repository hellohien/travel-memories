import React, { useState } from 'react';

export default function NavBar(props) {
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(prevNavbarState => !prevNavbarState);
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };

  return (
    <nav className="nav-bar">
      <button onClick={handleToggle}>{isNavbarOpen ? <i className="fa fa-times" aria-hidden="true"></i> : <i className="fa fa-bars" aria-hidden="true"></i>}</button>
      <div className={isNavbarOpen ? ' overlay' : ''} />
      <ul className={`menu-nav ${isNavbarOpen ? ' show-menu' : ''}`}>
            <li>
              <a onClick={() => closeMenu()} className="nav-link" href="#addEntry">Add Entry</a>
            </li>
            <li>
              <a onClick={() => closeMenu()} className="nav-link" href="#myMemories">My Memories</a>
            </li>
          </ul>
    </nav>
  );
}
