import React from 'react';
import PageTitle from './page-title';
import Form from './form';

export default class NewEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: []
    };
    this.addMemory = this.addMemory.bind(this);
  }

  addMemory(newMemory) {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const bodyJSON = JSON.stringify(newMemory);
    fetch('/api/memories', {
      method: 'POST',
      headers,
      body: bodyJSON
    })
      .then(res => res.json())
      .then(memory => {
        const updatedMemories = this.state.memories.slice();
        updatedMemories.push(memory);
        this.setState({ memories: updatedMemories });
      });
  }

  render() {
    return (
    <>
      <PageTitle text="New Entry" />
      <Form onSubmit={this.addMemory}></Form>
    </>
    );
  }

}
