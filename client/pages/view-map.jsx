import React, { lazy, Suspense } from 'react';

const MemoryMap = lazy(() => import('../components/memory-map'));
const PageTitle = lazy(() => import('../components/page-title'));

export default function ViewMap(props) {
  const { memories } = props;
  return (
    <Suspense fallback={<div className="row">Loading...</div>}>
      <PageTitle title="Places I've Visited" />
      <MemoryMap
        memories={memories}
      />
    </Suspense>
  );
}
