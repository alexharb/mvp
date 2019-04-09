import React, { useState, useEffect } from 'react';
import Unit from '../classes/Unit.js';
import Weapon from '../classes/Weapon.js'
import UnitView from './UnitView.jsx';

function SelectorTab(props) {
  const { prepPhase, recruit, armies, toggleArmy, activeArmy, editArmyMax } = props
  const [armyCount, setArmyCount] = useState(0);
  const [selectedWeapon, setWeapon] = useState(0);
  const [selectedColor, setColor] = useState(0);
  const [selectedMov, setMov] = useState(0);
  let playerChecked = activeArmy === 1 ? false : true;
  let enemyChecked = !playerChecked;

  function handleAdd() {
    let side = activeArmy === 1 ? 'enemy' : 'player'
    if (armies[side].units.length === armies[side].max) {
      alert(`The ${side}'s army already has ${armies[side].max} recruit(s).  Please remove a unit to add a new one.`);
    } else {
      let weapon = new Weapon(Number(selectedWeapon), Number(selectedColor))
      let unit = new Unit(selectedMov, weapon);
      recruit(side, unit);
      setArmyCount(armyCount + 1)
    }
  }

  function handleSwap(event) {
    let target = event.target;
    if (target.value === 'player') {
      toggleArmy(0);
    } else {
      toggleArmy(1);
    }
  }

  function selectWeapon(event) {
    let weapon = event.target.value
    if (weapon < 2) {
      setWeapon(weapon);
      setColor(weapon);
    } else {
      setWeapon(weapon);
    }
  }

  function selectColor(event) {
    let color = event.target.value;
    setColor(color);
  }

  function selectMovement(event) {
    let mov = event.target.value;
    setMov(mov);
  }

  return(
    <div id="selectorTab">
      {prepPhase === 0 &&
      <div>
      <label htmlFor="playerSize">Select the size of the player's army:</label><br></br>

      <select id="playerSize" name="player" onChange={editArmyMax}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </select><br></br>
      <label htmlFor="enemySize">Select the size of the enemy's army:</label><br></br>

      <select id="enemySize" name="enemy" onChange={editArmyMax}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </select><br></br>
      </div>
      }
      {[1, 2].includes(prepPhase) && 
        <div>
          <div>
            <input type="radio" 
                   value="player" 
                   name="starter" 
                   onChange={handleSwap} 
                   checked={playerChecked}/>
            <label htmlFor="player">Player</label>
          </div>
          <div>
            <input type="radio" 
                   value="enemy"
                   name="starter" 
                   onChange={handleSwap}
                   checked={enemyChecked}/>
            <label htmlFor="enemy">Enemy</label>
          </div>
        </div>
      }

      {prepPhase === 1 && 
        <div>
  
        <select id="movementSelector" onChange={selectMovement}>
          <option value={0}>Infantry</option>
          <option value={1}>Armor</option>
          <option value={2}>Flying</option>
          <option value={3}>Cavalier</option>
        </select><br></br>
  
        <select id="weaponSelector" onChange={selectWeapon}>
          <option value={0}>Sword</option>
          <option value={1}>Lance</option>
          <option value={2}>Axe</option>
          <option value={3}>Magic</option>
          <option value={4}>Dagger</option>
          <option value={5}>Bow</option>
          <option value={6}>Dragon</option>
        </select><br></br>
        {selectedWeapon > 2 &&
        <select id="colorSelector" onChange={selectColor}>
          <option value={0}>Red</option>
          <option value={1}>Blue</option>
          <option value={2}>Green</option>
          {selectedWeapon > 3 &&
            <option value={3}>Colorless</option>
          }
        </select>
        }<br></br>
        <button onClick={handleAdd}>Deploy</button>
        </div>
      }
      {armies.player.units.map((each, index) => {
        return <UnitView unit={each} team={'player'} key={index}/>
      })}
      {armies.enemy.units.map((each, index) => {
        return <UnitView unit={each} team={'enemy'} key={index}/>
      })}
    </div>
  )
}

export default SelectorTab;