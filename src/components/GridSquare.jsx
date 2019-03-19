import React, { useState, useEffect } from 'react';

function GridSquare(props) {
  const { gameState, activeArmy, armies } = props
  const [terrainType, updateTerrain] = useState(0);
  const [terrainLabel, updateLabel] = useState('land');
  const [isStart, updateStart] = useState(false);
  const [startValueTeam, updateTeam] = useState('');
  const [placedUnit, updateUnit] = useState({});

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
        placedUnit.isPlaced = false;
      } else if (startValueTeam === '') {
        if (armies[army].placedUnits < armies[army].max) {
          armies[army].placedUnits++;
          updateTeam(army);
          updateStart(true);
          let unit = makeUnitAbbrev();
          unit.isPlaced = true;
          updateUnit(unit);
        } else {
          alert(`The ${army} army has already placed the maximum number of units`)
        }
      } else {
        alert(`You cannot overwrite the other team's starting position`)
      }
    }
  }
  
  function makeUnitAbbrev() {
    let army = activeArmy === 1 ? 'enemy' : 'player';
    army = armies[army].units
    let string = '';
    let unit;
    army.forEach((each) => {
      console.log(each);
      if (!each.isPlaced && string === '') {
        unit = each;
        let title = each.title
        title = title.split(' ');
        console.log(title);
        title = title.map((each) => {
          return each.substring(0, 1);
        });
        title = title.join('');
        string = title
      }
    })
    unit.smallTitle = string;
    return unit;
  }

  return(
    <div className={`square ${terrainLabel}`} onClick={cycleTerrain}>
    {isStart && 
      <div className={`startingPosition ${startValueTeam}`}>
        {placedUnit.smallTitle}
      </div>
    }
    </div>
  )
}

export default GridSquare;