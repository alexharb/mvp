import React, { useState, useEffect } from 'react';
import { tileMoveCheck, tilePlaceCheck } from '../helpers/helpers.js'

function GridSquare(props) {
  const { gameState, activeArmy, armies, initTerrain, totalMap, column, row } = props
  
  const [terrainType, updateTerrain] = useState(initTerrain);
  const [terrainLabel, updateLabel] = useState('land');
  const [isStart, updateStart] = useState(false);
  const [startValueTeam, updateTeam] = useState('');
  const [placedUnit, updateUnit] = useState({});
  const [placedColor, updateColor] = useState('red');

  useEffect(() => {
    let terrains = ['land', 'forest', 'water', 'wall', 'trench', 'ruin']
    updateLabel(terrains[terrainType])
  }, [terrainType])

  function cycleTerrain(event) {
    let army = activeArmy === 1 ? 'enemy' : 'player'
    let colorArray = ['red', 'blue', 'green', 'colorless']
    if (gameState === 0) {
      updateTerrain((terrainType + 1) % 6);
    } else if (gameState === 2) {
      if (army === startValueTeam) {
        armies[army].placedUnits--;
        placedUnit.isPlaced = false;
        updateColor(colorArray[placedUnit.type])
        updateTeam('');
        updateStart(false);
      } else if (startValueTeam === '') {
        if (armies[army].placedUnits < armies[army].max) {
          let unit = makeUnitAbbrev();
          if (tilePlaceCheck(unit, terrainType)) {
            armies[army].placedUnits++;
            unit.isPlaced = true;
            updateTeam(army);
            updateStart(true);
            updateColor(colorArray[unit.weapon.color]);
            updateUnit(unit);
          } else {
            alert(`This unit type cannot enter this tile.  Please place elsewhere`)
          }
        } else {
          alert(`The ${army} army has already placed the maximum number of units`)
        }
      } else {
        alert(`You cannot overwrite the other team's starting position`)
      }
    } else if (gameState === 3) {
      if (isStart) {
        if (!isStart) {
          // turn it off
        } else {
          tileMoveCheck(totalMap, column, row, placedUnit, placedUnit.weapon.range, startValueTeam)
        }
      }
    }
  }
  
  function makeUnitAbbrev() {
    let army = activeArmy === 1 ? 'enemy' : 'player';
    army = armies[army].units
    let string = '';
    let unit;
    army.forEach((each) => {
      if (!each.isPlaced && string === '') {
        unit = each;
        let title = each.title;
        title = title.split(' ');
        title = title.map((each) => {
          if (each !== "Dragon") {
            return each.substring(0, 1);
          } else {
            return each.substring(0, 2);
          }
        });
        title.splice(1, 1);
        title = title.join('');
        string = title;
      }
    })
    unit.smallTitle = string;
    return unit;
  }

  return(
    <div className={`square ${terrainLabel} row${row} col${column}`} onClick={cycleTerrain}>
    {isStart && 
      <div className={`startingPosition ${startValueTeam}`}>
        <p className={placedColor}>
          {placedUnit.smallTitle}
        </p>
      </div>
    }
    </div>
  )
}

export default GridSquare;