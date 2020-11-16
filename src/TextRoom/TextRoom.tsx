import * as React from 'react';

type Props = {
  name: string;
};

function TextRoom({ name }: Props) {
  return <div>you're in a text room {name}</div>;
}

export default TextRoom;
