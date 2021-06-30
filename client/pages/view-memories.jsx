import React, { lazy, Suspense } from 'react';

const PageTitle = lazy(() => import('../components/page-title'));
const MemorySearch = lazy(() => import('../components/memory-search'));

export default function ViewMemories(props) {
  const { memories, deleteMemory } = props;
  return (
    <Suspense fallback={<div className="row">Loading...</div>}>
      <PageTitle title="My Memories"/>
      <MemorySearch
        memories={memories}
        deleteMemory={deleteMemory}
      />
    </Suspense>
  );
}
