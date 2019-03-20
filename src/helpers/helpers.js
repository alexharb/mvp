function tilePlaceCheck(unit, terrain) {
  if (terrain === 3 || terrain === 5) {
    return false;
  } else if (terrain === 2 && unit.type !== 2) {
    return false
  } else if (terrain === 1 && unit.type === 3) {
    return false
  } else {
    return true;
  }
}

function checkTileLegality(terrain, unit, mov) {
  let legal;
  if (terrain === 3 || terrain === 5) {
    legal = false;
  } else if (unit.type === 3 && terrain === 1) {
    legal = false;
  } else if (unit.type === 2) {
    legal = true;
  } else if (terrain === 2) {
    legal = false;
  } else if ((mov === 1 && unit.type === 0 && terrain === 1)
             || (mov === 2 && unit.type === 3 && terrain === 4)) {
    legal = true;
    unit.stats.mov = 0;
  } else if ((unit.type === 0 && terrain === 1) || (unit.type === 3 && terrain === 4)) {
    legal = false
  } else {
    legal = true;
  }
  return legal;
}

function tileMoveCheck(grid, column, row, unit, range, team) {
  let element = document.getElementsByClassName(`col${column} row${row}`)[0];
  let mov = unit.stats.mov;
  if (column < 0 || column >= grid.length || row < 0 || row >= grid[0].length || mov < -1) {
    return false;
  } else if (mov === -1) {
    // let node = document.createElement('div');
    // node.classList.toggle('canAttack');
    // element.appendChild(node);
  } else {
    let canMove = false;
    let terrain = grid[column][row].terrain
    if (element.children.length > 0) {
      if (element.children[0].classList.contains(`${team}`) && element.children.length === 1) {
        canMove = checkTileLegality(terrain, unit, mov);
      }
    } else if (mov >= 0) {
      canMove = checkTileLegality(terrain, unit, mov)
    }
    if (canMove) {
      let node = document.createElement('div');
      node.classList.toggle('canMove');
      element.appendChild(node);
      unit.stats.mov--;
      tileMoveCheck(grid, column + 1, row, unit, range, team);
      tileMoveCheck(grid, column, row + 1, unit, range, team);
      tileMoveCheck(grid, column - 1, row, unit, range, team);
      tileMoveCheck(grid, column, row - 1, unit, range, team);
      unit.stats.mov = mov;
    }
  }
}

function isMovementTileCheck(column, row) {
  let element = document.getElementsByClassName(`col${column} row${row}`)[0];
  return Array.from(element.children).reduce((value, each) => {
    if (each.classList.contains('canMove')) {
      return true;
    } else {
      return value;
    }
  }, false)
}

export { tilePlaceCheck, tileMoveCheck, isMovementTileCheck };
  