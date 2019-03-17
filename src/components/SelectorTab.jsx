import React, { useState, useEffect } from 'react';
import Unit from '../classes/Unit.js';
import UnitView from './UnitView.jsx';

function SelectorTab(props) {
  const [armyCount, setArmyCount] = useState(0);

  function handleAdd(event) {
    let side;
    let army = document.getElementById('armySelector').value;
    if (army === '1') {
      side = 'enemy';
    } else {
      side = 'player';
    }
    if (props.armies[side].units.length === props.armies[side].max) {
      alert(`The ${side}'s army already has ${props.armies[side].max} recruit(s).  Please remove a unit to add a new one.`);
    } else {
      let unit = new Unit();
      props.recruit(army, unit);
      setArmyCount(armyCount + 1)
    }
  }

  return(
    <div id="selectorTab">
      { props.prepPhase === 0 &&
      <div>
      <label htmlFor="playerSize">Select the size of the player's army:</label><br></br>

      <select id="playerSize">
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </select><br></br>
      <label htmlFor="enemySize">Select the size of the enemy's army:</label><br></br>

      <select id="enemySize">
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </select><br></br>
      </div>
      }
      {props.prepPhase === 1 && 
        <div>
        <select id="armySelector">
          <option value={0}>Player</option>
          <option value={1}>Enemy</option>
        </select><br></br>
  
        <select id="movementSelector">
          <option value={0}>Infantry</option>
          <option value={1}>Armor</option>
          <option value={2}>Flying</option>
          <option value={3}>Cavalier</option>
        </select><br></br>
  
        <select id="weaponSelector">
          <option value={0}>Sword</option>
          <option value={1}>Lance</option>
          <option value={2}>Axe</option>
          <option value={3}>Bow</option>
          <option value={4}>Dagger</option>
          <option value={5}>Red Magic</option>
          <option value={6}>Blue Magic</option>
          <option value={7}>Green Magic</option>
        </select><br></br>
        <button onClick={handleAdd}>Deploy</button>
        </div>
      }
      {props.armies.player.units.map((each) => {
        console.log(each);
        return <UnitView unit={each}/>
      })}
      {props.armies.enemy.units.map((each) => {
        return <UnitView unit={each}/>
      })}
    </div>
  )
}

export default SelectorTab;