import React from 'react';
import TravelEntry from './travel-entry';

export default class TravelMemories extends React.Component {
  render() {
    const { memories } = this.props;
    return (
      <div>
        {memories.map(memory => (
          <TravelEntry
            key={memory.memoryId}
            placeVisited={memory.placeVisited}
            date={memory.date}
            favoriteMoments={memory.favoriteMoments}
          />
        ))}
      </div>
    );
  }
}
