import React, { Component, lazy, Suspense } from 'react';
import parseRoute from './lib/parse-route';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEntry = lazy(() => import('./pages/add-entry'));
const Header = lazy(() => import('./components/header'));
const MyMemories = lazy(() => import('./pages/my-memories'));
const Auth = lazy(() => import('./pages/auth'));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      memories: [],
      route: parseRoute(window.location.hash),
      isAuth: false
    };
    this.addMemory = this.addMemory.bind(this);
    this.deleteMemory = this.deleteMemory.bind(this);
    this.displayToast = this.displayToast.bind(this);
  }

  componentDidMount() {
    this.getAllMemories();
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'addEntry') {
      return <AddEntry
                onSubmit={this.addMemory}
                memories={this.state.memories}
              />;
    }
    if (route.path === 'myMemories') {
      return <MyMemories
                memories={this.state.memories}
                deleteMemory={this.deleteMemory}
              />;
    }
    if (route.path === '' || route.path === 'signIn' || route.path === 'signUp') {
      return <Auth
              route={this.state.route}
            />;
    }
  }

  displayToast() {
    toast.configure();
    toast.success('Entry submitted successfully', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: false,
      progress: undefined
    });
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
        this.displayToast();
      })
      .catch(err => {
        console.log('Fetch failed', err);
      });
  }

  deleteMemory(memoryId) {
    const index = this.state.memories.findIndex(memory => memory.memoryId === memoryId);
    const headers = new Headers();
    const bodyJSON = JSON.stringify(this.state.memories[index]);
    headers.set('Content-Type', 'application/json');
    fetch(`/api/memories/${memoryId}`, {
      method: 'DELETE',
      headers,
      body: bodyJSON
    })
      .then(res => res.json())
      .then(memory => {
        const updatedMemories = this.state.memories.slice();
        updatedMemories.splice(index, 1);
        this.setState({ memories: updatedMemories });
      })
      .catch(err => {
        console.log('Fetch failed', err);
      });
  }

  render() {
    const { route } = this.state;
    return (
      <Suspense fallback={<div className="loader"></div>}>
        <div className="main-container">
          {(route.path === 'signUp' || route.path === 'signIn')
            ? null
            : <Header />
          }
          {this.renderPage()}
        </div>
      </Suspense>
    );
  }
}
