import * as React from 'react';
import Fallback from '../Common/Fallback';

const HeartRoom = React.lazy(() => import('./HeartRoom'));

export default function HeartEntry({ name }: { name: string }) {
  return (
    <React.Suspense fallback={<Fallback />}>
      <HeartRoom name={name} />
    </React.Suspense>
  );
}
