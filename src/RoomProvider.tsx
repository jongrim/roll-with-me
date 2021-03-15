import * as React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import HeartRoom from './Heart/HeartRoom';
import InteractiveRoom from './InteractiveRoom/InteractiveRoom';
import { roomCodes } from './roomPaths';
import TextRoom from './TextRoom/TextRoom';
import TrophyDarkRoom from './TrophyDark/TrophyDarkRoom';
import TrophyGoldRoom from './TrophyGold/TrophyGoldRoom';

function RoomProvider() {
  const { name, type } = useParams<{ name: string; type: string }>();

  switch (type) {
    case roomCodes.text:
      return <TextRoom name={name} />;
    case roomCodes.visual:
      return <InteractiveRoom name={name} />;
    case roomCodes.trophyDark:
      return <TrophyDarkRoom name={name} />;
    case roomCodes.heart:
      return <HeartRoom name={name} />;
    case roomCodes.trophyGold:
      return <TrophyGoldRoom name={name} />;
    default:
      return <Redirect path="*" to="/new-room?notFound=true" />;
  }
}

export default RoomProvider;
