import React, { useState, useEffect } from 'react';

function InfoTab(props) {
  const { prepPhase, selectedUnit } = props;
  const { title, weapon, assist, special, aSkill, bSkill, cSkill, sSeal, stats } = selectedUnit;
  const { hp, atk, spd, def, res, mov } = stats;

  return(
    <div id="infoTab">
    { prepPhase === 0 &&
      <p>
        First, let's make a map and decide how many units each team will have.

        Light Green is land - anyone can move freely on it <br></br><br></br>
        Dark Green is a forest.  Infantry units must stand adjacent to a forest to enter it. Cavalry units cannot enter forests.<br></br><br></br>
        Blue is water (or a mountain or whatever).  Only fliers may pass over water.<br></br><br></br>
        Gray is a wall.  Walls completely block movement.<br></br><br></br>
        Orange is a trench.  Trenches are like forests for cavaliers.  They must be adjacent to enter that space.<br></br><br></br>
        Brown is terrain that can be destroyed by an attack.  Once destroyed, it becomes land.<br></br><br></br>
      </p>
    }
    { prepPhase === 1 &&
      <p>
        Now, let's make our teams.

        Infantry units can move two spaces, just not through directly through trees or over water. <br></br><br></br>
        Armor units can only move one space, but have higher defenses<br></br><br></br>
        Flying units can pass over any terrain, but are weak to bows<br></br><br></br>
        Cavaliers can move 3 spaces, but cannot traverse through forests, and are slowed down by trenches<br></br><br></br>
      </p>
    }
    { prepPhase === 2 &&
      <p>
        Decide the starting position for each team.
      </p>
    }
    {
      (prepPhase === 3) &&
      <p>
        HP: {hp} <br></br><br></br>
        Atk: {atk} <br></br><br></br>
        Spd: {spd} <br></br><br></br>
        Def: {def} <br></br><br></br>
        Res: {res} <br></br><br></br>
        Mov: {mov} <br></br><br></br>
        A: {aSkill.text} <br></br><br></br>
        B: {bSkill.text} <br></br><br></br>
        C: {cSkill.text} <br></br><br></br>
        S: {sSeal.text} <br></br><br></br>
        Assist: {assist.text} <br></br><br></br>
        Special: {special.text} <br></br><br></br>
      </p>
    }
    </div>
  )
}

export default InfoTab