import React, { useState, useEffect } from 'react';

function GridSquare(props) {
  const { gameState, activeArmy, armies } = props
  const [terrainType, updateTerrain] = useState(0);
  const [terrainLabel, updateLabel] = useState('land');
  const [isStart, updateStart] = useState(false);
  const [startValueTeam, updateTeam] = useState('');

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
    let army = activeArmy === 1 ? 'enemy' : 'player'
    if (gameState === 0) {
      updateTerrain((terrainType + 1) % 5);
    } else if (gameState === 2) {
      console.log(armies[army].max)
      if (army === startValueTeam) {
        updateTeam('');
        updateStart(false);
        armies[army].placedUnits--;
      } else if (startValueTeam === '') {
        if (armies[army].placedUnits < armies[army].max) {
          armies[army].placedUnits++;
          updateTeam(army);
          updateStart(true);
        } else {
          alert(`The ${army} army has already placed the maximum number of units`)
        }
      } else {
        alert('You cannot overwrite the other teams starting position')
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