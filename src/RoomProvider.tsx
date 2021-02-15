import * as React from 'react';
import { useParams } from 'react-router-dom';
import InteractiveRoom from './InteractiveRoom/InteractiveRoom';
import TextRoom from './TextRoom/TextRoom';
import TrophyDarkRoom from './TrophyDark/TrophyDarkRoom';

function RoomProvider() {
  const { name, type } = useParams<{ name: string; type: string }>();

  switch (type) {
    case 'r':
      return <TextRoom name={name} />;
    case 'i':
      return <InteractiveRoom name={name} />;
    case 'trophy-dark':
      return <TrophyDarkRoom name={name} />;
    default:
      return <div>Sorry, that room type isn't recognized</div>;
  }
}

export default RoomProvider;
