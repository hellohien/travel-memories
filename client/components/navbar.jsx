import React, { useState } from 'react';

export default function NavBar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(prevNavbarState => !prevNavbarState);
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };

  navbarOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';

  return (
    <nav className="nav-bar">
      <button aria-label="Right Align" onClick={handleToggle}>{navbarOpen ? <i className="fa fa-times" aria-hidden="true"></i> : <i className="fa fa-bars" aria-hidden="true"></i>}</button>
      <div className={navbarOpen ? ' overlay' : ''} />
      <ul className={`menu-nav ${navbarOpen ? 'show-menu open' : ''}`}>
        <li><a onClick={() => closeMenu()} className="nav-link" href="#addEntry">Add Entry</a></li>
        <li><a onClick={() => closeMenu()} className="nav-link" href="#viewMemories">View Memories</a></li>
        <li><a onClick={() => closeMenu()} className="nav-link" href="#viewMap">View Map</a></li>
      </ul>
    </nav>
  );
}
