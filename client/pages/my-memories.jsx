import React from 'react';
import PageTitle from '../components/page-title';
import MemorySearch from '../components/memory-search';
import Redirect from '../components/redirect';

export default function MyMemories(props) {
  const { user, memories, deleteMemory } = props;
  if (user === null) return <Redirect to="#signIn" />;
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
