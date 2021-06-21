import React from 'react';

export default function Message(props) {
  return (
    <div className="success-message show">
      <span className="content">{props.content}</span>
    </div>
  );
}
