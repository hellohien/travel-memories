import React from 'react';

export default class TravelEntry extends React.Component {
  render() {
    const { placeVisited, date, favoriteMoments } = this.props;
    return (
      <div>
        <h1>{placeVisited}</h1>
        <p>{date}</p>
        <p>{favoriteMoments}</p>
      </div>
    );
  }
}
