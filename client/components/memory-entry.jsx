import React from 'react';
import { format, parse } from 'date-fns';

export default class MemoryEntry extends React.Component {
  render() {
    const { placeVisited, favoriteMoments } = this.props;
    // const { memoryId } = this.props.memory;
    let { date } = this.props;
    date = date.slice(0, 10);
    const parsedDate = parse(date, 'yyyy-mm-dd', new Date());
    const formattedDate = format(parsedDate, 'mm-dd-yyyy');
    return (
        <div className="sticky-note"
        >
          <div className="tape"></div>
          <div>
            <button
              className="delete-icon far fa-trash-alt"
              onClick={this.props.handleClick}
            >
            </button>
          </div>
          <h3>{placeVisited}</h3>
          <p>{formattedDate}</p>
          <p>{favoriteMoments}</p>
        </div>
    );
  }
}
