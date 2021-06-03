import React from 'react';
import MemoryEntry from '../components/memory-entry';
import DeleteModal from './delete-modal';

export default class MemorySearch extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputValue: '',
      showModal: false,
      show: false
    };
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputValueChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClick(event) {
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
                    />
                  </div>
                  );
                })
              }
            {this.state.showModal ? <DeleteModal /> : null}
          </div>
        }
      </>
    );
  }
}
