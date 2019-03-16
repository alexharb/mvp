import React, { useState, useEffect } from 'react';

function GridSquare(props) {
  const [terrainType, updateTerrain] = useState(0);
  const [terrainLabel, updateLabel] = useState('land');

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

  function cycleTerrain() {
    if (!props.gameState) {
      updateTerrain((terrainType + 1) % 5);
    }
  }

  return(
    <div className={`square ${terrainLabel}`} onClick={cycleTerrain}></div>
  )
}

export default GridSquare;