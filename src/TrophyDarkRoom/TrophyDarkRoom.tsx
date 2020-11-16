import * as React from 'react';

type Props = {
  name: string;
};

function TrophyDarkRoom({ name }: Props) {
  return <div>you're in a trophy-dark room {name}</div>;
}

export default TrophyDarkRoom;
