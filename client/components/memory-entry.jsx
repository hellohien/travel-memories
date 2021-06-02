import React from 'react';
import { format, parse } from 'date-fns';

export default class MemoryEntry extends React.Component {
  render() {
    const { placeVisited, favoriteMoments } = this.props;
    let { date } = this.props;
    date = date.slice(0, 10);
    const newDate = parse(date, 'yyyy-mm-dd', new Date());
    const formattedDate = format(newDate, 'MMM dd, yyyy');
    return (
        <div className="sticky-note">
          <div className="tape"></div>
          <h3>{placeVisited}</h3>
          <p>{formattedDate}</p>
          <p>{favoriteMoments}</p>
        </div>
    );
  }
}
