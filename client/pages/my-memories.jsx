import React from 'react';
import PageTitle from '../components/page-title';
import MemorySearch from '../components/memory-search';

export default class MyMemories extends React.Component {
  render() {
    const { memories } = this.props;
    return (
      <>
        <PageTitle title="My Memories"/>
        <MemorySearch
        memories={memories}
        />
      </>
    );
  }
}
