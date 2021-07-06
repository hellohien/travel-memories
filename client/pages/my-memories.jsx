import React from 'react';
import PageTitle from '../components/page-title';
import MemorySearch from '../components/memory-search';

export default function ViewMemories(props) {
  const { memories, deleteMemory } = props;
  return (
    <>
      <PageTitle title="My Memories"/>
      <MemorySearch
        memories={memories}
        deleteMemory={deleteMemory}
      />
    </>
  );
}
