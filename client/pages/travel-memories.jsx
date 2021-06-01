import React from 'react';
import TravelEntry from './travel-entry';
import PageTitle from '../components/page-title';

export default class TravelMemories extends React.Component {
  render() {
    const { memories } = this.props;
    return (
      <>
        <PageTitle title="My Memories"/>
        <div className="row">
          {memories.map(memory => (
            <TravelEntry
              key={memory.memoryId}
              placeVisited={memory.placeVisited}
              date={memory.date}
              favoriteMoments={memory.favoriteMoments}
            />
          ))}
        </div>
      </>
    );
  }
}
