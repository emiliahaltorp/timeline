import React from "react";
import { CreateGameView } from "../Views/createGameView.js";

export function CreateGame({ model }) {

  return (
    <CreateGameView
      onNumPlayers={(x) => model.setNumberOfPlayers(x)}
      onStartYear={(x) => model.setStartYear(x)}
      onEndYear={(x) => model.setEndYear(x)}
      startYear={() => model.getStartYear()}
      endYear={() => model.getEndYear()}
      onName={(name) => model.setGameName(name)}
      range={model.range}
      onSliderChange={(x)=> model.setRange(x)}
    />
  );
}
