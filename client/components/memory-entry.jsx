import React, { Component } from 'react';
import DateFNS from '../lib/date-fns';

export default class MemoryEntry extends Component {
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
    const formattedDate = DateFNS(this.props.date);
    this.state.showModal ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
    return (
      <>
        <div className="sticky-note">
          <div className="tape"></div>
          <div>
            <button
              className="delete-icon far fa-trash-alt"
              onClick={this.toggleModal}
            />
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
