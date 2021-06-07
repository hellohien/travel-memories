import React from 'react';

export default function PageTitle(props) {
  return (
    <div className="row column-full page-title">
      <h1>{props.title}</h1>
    </div>
  );
}
