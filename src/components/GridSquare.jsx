import React, { useState, useEffect } from 'react';
import { tileMoveCheck, tilePlaceCheck, removeTileMoveCheck, tileAttackCheck } from '../helpers/helpers.js'

function GridSquare(props) {
  const { gameState, activeArmy, armies, totalMap, column, row, mapDispatch, gridData, changeTurnPhase } = props;
  const { terrain, unitPlaced, canMove, canAttack, isStarter, team, placedColor, hasMoved } = gridData;
  const army = activeArmy === 1 ? 'enemy' : 'player';
  const colorArray = ['red', 'blue', 'green', 'colorless'];
  
  const [terrainType, updateTerrain] = useState(terrain);
  const [terrainLabel, updateLabel] = useState('land');

  useEffect(() => {
    let terrains = ['land', 'forest', 'water', 'wall', 'trench', 'ruin'];
    let action = {
      type: 'terrain',
      column: column,
      row: row,
      terrain: terrainType
    };
    mapDispatch(action);
    updateLabel(terrains[terrainType]);
  }, [terrainType]);

  function putUnitOnSquare(unit) {
    unit.isPlaced = true;
    mapDispatch({column: column,
       row: row,
       army: army,
       color: colorArray[unit.weapon.color], 
       unit: unit, 
       type: 'placeUnit'});
  }


  function cycleTerrain() {
    if (gameState === 0) {
      updateTerrain((terrainType + 1) % 6);
    } else if (gameState === 2) {
      if (army === team) {
        armies[army].placedUnits--;
        unitPlaced.isPlaced = false;
        mapDispatch({column: column, row: row, color: colorArray[unitPlaced.type], army: '', type: 'removeUnit'});
        changeTurnPhase({type: null});
      } else if (team === '') {
        if (armies[army].placedUnits < armies[army].max) {
          let unit = makeUnitAbbrev();
          if (tilePlaceCheck(unit, terrainType)) {
            armies[army].placedUnits++;
            putUnitOnSquare(unit);
            changeTurnPhase({type: null});
          } else {
            alert(`This unit type cannot enter this tile.  Please place elsewhere`);
          }
        } else {
          alert(`The ${army} army has already placed the maximum number of units`);
        }
      } else {
        alert(`You cannot overwrite the other team's starting position`);
      }
    } else if (gameState === 3) {
      if (team !== army && isStarter) {
        alert('It is not your turn');
      }
      else if (hasMoved) {
        alert('This unit has already moved');
      }
      else if (isStarter) {
        if (unitPlaced.isSelected) {
          removeTileMoveCheck(totalMap, mapDispatch);
          unitPlaced.isSelected = false;
          changeTurnPhase({type: null});
        } else {
          tileMoveCheck(totalMap, column, row, unitPlaced, team, mapDispatch);
          changeTurnPhase({ type: 'move', unit: unitPlaced});
          tileAttackCheck(totalMap, column, row, unitPlaced.range, mapDispatch);
          unitPlaced.isSelected = true;
        }
      } else {
        if (canMove) {
          let mover;
          armies[army].units.forEach((each) => {
            if (each.isSelected) {
              mover = each
            }
          });
          removeTileMoveCheck(totalMap, mapDispatch);
          mapDispatch({column: column, row: row, unit: mover, type: 'moveUnit'});
          changeTurnPhase({type: null});
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
    });
    unit.smallTitle = string;
    return unit;
  }

  return(
    <div className={`square ${terrainLabel} row${row} col${column}`} onClick={cycleTerrain}>
    {isStarter && 
      <div className={`startingPosition ${team}`}>
        <p className={placedColor}>
          {unitPlaced.smallTitle}
        </p>
      </div>
    }
    {canMove && 
      <div className="canMove"></div>}
    {(canAttack && isStarter) &&
      <div></div>}
    {canAttack &&
      <div className="canAttack"></div>}
    </div>
  )
}

export default GridSquare;