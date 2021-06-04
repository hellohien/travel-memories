import React from 'react';
import { format, parse } from 'date-fns';

export default class MemoryEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isDeleted: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleDelete() {
    this.setState({ isDeleted: true });
  }

  render() {
    const { placeVisited, favoriteMoments } = this.props;
    const { memoryId } = this.props.memory;
    let { date } = this.props;
    date = date.slice(0, 10);
    const parsedDate = parse(date, 'yyyy-mm-dd', new Date());
    const formattedDate = format(parsedDate, 'mm-dd-yyyy');
    return (
      <>
        <div className="sticky-note"
        >
          <div className="tape"></div>
          <div>
            <button
              className="delete-icon far fa-trash-alt"
              onClick={this.toggleModal}
            >
            </button>
          </div>
          <h3>{placeVisited}</h3>
          <p>{formattedDate}</p>
          <p>{favoriteMoments}</p>
        </div>
        {this.state.showModal
          ? <div className="modal-container overlay">
            <div className="modal row column-full">
              <div>
                <span><i className="warning-icon fas fa-exclamation-circle"></i></span>
                <h3>Are you sure you want to delete this memory?</h3>
              </div>
              <div>
                <button onClick={this.toggleModal} className="cancel-button">Cancel</button>
                <button onClick={this.handleDelete} className="delete-button">Delete</button>
                {this.state.isDeleted ? this.props.deleteMemory(memoryId) : null}
              </div>
            </div>
          </div>
          : null
        }
      </>
    );
  }
}
