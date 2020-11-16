import * as React from 'react';

type Props = {
  name: string;
};

function InteractiveRoom({ name }: Props) {
  return <div>you're in an interactive room {name}</div>;
}

export default InteractiveRoom;
