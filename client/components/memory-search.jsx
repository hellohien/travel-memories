import React, { Component } from 'react';
import MemoryEntry from '../components/memory-entry';

export default class MemorySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
  }

  handleInputValueChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    const { memories } = this.props;
    const { inputValue } = this.state;
    return (
      <>
        <div className="search-box row">
          <input
            type="text"
            placeholder="Search location"
            onChange={this.handleInputValueChange}
          />
        </div>
        {memories.length === 0
          ? <div className="row no-entries-found">No entries to show</div>
          : <div className="row">
                {memories.filter(memory => {
                  if (inputValue === '') return memory;
                  else if (memory.placeVisited.toLowerCase().includes(inputValue.toLowerCase())) return memory;
                  else return false;
                }).map((memory, key) => {
                  return (
                  <div className="sticky-note-wrapper" key={key}>
                    <MemoryEntry
                      key={memory.memoryId}
                      placeVisited={memory.placeVisited}
                      date={memory.date}
                      favoriteMoments={memory.favoriteMoments}
                      memory={memory}
                      deleteMemory={this.props.deleteMemory}
                    />
                  </div>
                  );
                })}
            </div>
        }
      </>
    );
  }
}
