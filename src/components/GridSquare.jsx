import React, { useState, useEffect } from 'react';

function GridSquare(props) {
  const [terrainType, updateTerrain] = useState(0);
  const [terrainLabel, updateLabel] = useState('land');
  const [isStart, updateStart] = useState(false);
  const [startValueTeam, updateTeam] = useState('enemy');

  useEffect(() => {
    if (terrainType === 4) {
      updateLabel('trench')
    } else if (terrainType === 3) {
      updateLabel('wall')
    } else if (terrainType === 2) {
      updateLabel('water')
    } else if (terrainType === 1) {
      updateLabel('forest')
    } else {
      updateLabel('land')
    }
  }, [terrainType])

  function cycleTerrain(event) {
    let target = event.target;
    if (props.gameState === 0) {
      updateTerrain((terrainType + 1) % 5);
    } else if (props.gameState === 2) {
      if (isStart) {
        updateStart(false);
      } else {
        updateStart(true);
      }
    }
  }

  return(
    <div className={`square ${terrainLabel}`} onClick={cycleTerrain}>
    {isStart && 
      <div className={`startingPosition ${startValueTeam}`}>
      </div>
    }
    </div>
  )
}

export default GridSquare;