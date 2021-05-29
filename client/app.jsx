import React from 'react';
import TravelDiary from './pages/travel-diary';
import Header from './pages/header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: []
    };
    this.addMemory = this.addMemory.bind(this);

  }

  componentDidMount() {
    this.getAllMemories();
  }

  getAllMemories() {
    fetch('/api/memories')
      .then(res => res.json())
      .then(memories => this.setState({ memories }))
      /* eslint-disable no-console */
      .catch(err => console.log('Fetch failed', err));
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
      })
      .catch(err => console.log('Fetch failed', err));
  }

  render() {
    return (
      <>
        <Header />
        <TravelDiary
          onSubmit={this.addMemory}
          memories={this.state.memories}
        />
      </>
    );
  }
}
