import React from 'react';

export default class MemoryEntry extends React.Component {
  render() {
    const { placeVisited, date, favoriteMoments } = this.props;
    return (
        <div className="sticky-note">
          <div className="tape"></div>
          <h3>{placeVisited}</h3>
          <p>{date}</p>
          <p>{favoriteMoments}</p>
        </div>
    );
  }
}
