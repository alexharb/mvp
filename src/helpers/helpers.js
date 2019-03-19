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

function tileMoveCheck(grid, column, row, unit, range, team) {
  let mov = unit.stats.mov;
  if (column < 0 || column >= grid.length || row < 0 || row >= grid[0].length || mov < -1) {
    return false;
  } else if (mov === -1) {

  } else {
    let canMove = false;
    let element = document.getElementsByClassName(`col${column} row${row}`)[0];
    let terrain = grid[column][row]
    if (element.children.length > 0) {
      if (element.children[0].classList.contains(`${team}`) && element.children.length === 1) {
        canMove = true;
      }
    } else if (mov >= 0) {
      if (terrain === 3 || terrain === 5) {
        canMove = false;
      } else if (unit.type === 3 && terrain === 1) {
        canMove = false;
      } else if (unit.type === 2) {
        canMove = true;
      } else if (terrain === 2) {
        canMove = false;
      } else if ((mov === 1 && unit.type === 0 && terrain === 1)
                 || (mov === 2 && unit.type === 3 && terrain === 4)) {
        canMove = true;
        unit.stats.mov = 0;
      } else if ((unit.type === 0 && terrain === 1) || (unit.type === 3 && terrain === 4)) {
        canMove = false
      } else {
        canMove = true;
      }
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

export { tilePlaceCheck, tileMoveCheck };
  