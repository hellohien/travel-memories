import React from 'react';
import MemoryEntry from '../components/memory-entry';
import Modal from './modal';

export default class MemorySearch extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputValue: '',
      showModal: false
    };
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleTrueFalse = this.toggleTrueFalse.bind(this);
  }

  handleInputValueChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleClick(event) {
    this.toggleTrueFalse();
  }

  toggleTrueFalse() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const { memories } = this.props;
    const { inputValue } = this.state;
    return (
      <>
        <div className="search-box row">
          <input
            type="text"
            placeholder="Search by location.."
            onChange={this.handleInputValueChange}
        />
      </div>
        {memories.length === 0
          ? <div className="row no-entries-found">No entries to show</div>
          : <div className="row">
                {memories.filter(memory => {
                  if (inputValue === '') {
                    return memory;
                  } else if (memory.placeVisited.toLowerCase().includes(inputValue.toLowerCase())) {
                    return memory;
                  } else {
                    return false;
                  }
                }).map((memory, key) => {
                  return (
                  <div className="sticky-note-wrapper" key={key}>
                    <MemoryEntry
                      handleClick={this.handleClick}
                      key={memory.memoryId}
                      placeVisited={memory.placeVisited}
                      date={memory.date}
                      favoriteMoments={memory.favoriteMoments}
                      memory={memory}
                    />
                  </div>
                  );
                })
              }
            {this.state.showModal ? <Modal handleClick={this.handleClick} /> : null}
          </div>
        }
      </>
    );
  }
}
