import React from 'react';

export default class DeleteModal extends React.Component {
  render() {
    return (
      <div className="modal-container overlay">
        <div className="modal row column-full">
          <div>
            <span><i className="warning-icon fas fa-exclamation-circle"></i></span>
            <h3>Are you sure you want to delete this memory?</h3>
          </div>
          <div>
            <button className="cancel-button">Cancel</button>
            <button className="delete-button">Delete</button>
          </div>
        </div>
      </div>
    );
  }

}
