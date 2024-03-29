import * as React from "react";
import { useParams, Redirect } from "react-router-dom";
import HeartEntry from "./Heart/HeartEntry";
import InteractiveRoom from "./InteractiveRoom/InteractiveRoom";
import { roomCodes } from "./roomPaths";
import TextRoom from "./TextRoom/TextRoom";
import TrophyDarkRoom from "./TrophyDark/TrophyDarkRoom";

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
      return <HeartEntry name={name} />;
    default:
      return <Redirect path="*" to="/new-room?notFound=true" />;
  }
}

export default RoomProvider;
