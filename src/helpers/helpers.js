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
  } else if ((unit.type === 0 && terrain === 1 && mov < 1) || (unit.type === 3 && terrain === 4)) {
    legal = false
  } else {
    legal = true;
  }
  return legal;
}

function tileMoveCheck(grid, column, row, unit, team, dispatch) {
  const { range } = unit
  let element = document.getElementsByClassName(`col${column} row${row}`)[0];
  let mov = unit.stats.mov;
  if (column < 0 || column >= grid.length || row < 0 || row >= grid[0].length || mov < -1) {
    return false;
  } else if (mov === -1) {
    // let node = document.createElement('div');
    // node.classList.toggle('canAttack');
    // element.appendChild(node);
  } else {
    let tile = grid[column][row];
    let canMove = false;
    let terrain = grid[column][row].terrain;
    if (element.children.length > 0) {
      if (element.children[0].classList.contains(`${team}`) && !tile.canMove) {
        canMove = checkTileLegality(terrain, unit, mov);
      }
    } else if (mov >= 0) {
      canMove = checkTileLegality(terrain, unit, mov);
    }
    if (canMove) {
      // let node = document.createElement('div');
      // node.classList.toggle('canMove');
      // element.appendChild(node);
      const action = {column: column, row: row, type: 'canMove'}
      dispatch(action)
      unit.stats.mov--;
      tileMoveCheck(grid, column + 1, row, unit, team, dispatch);
      tileMoveCheck(grid, column, row + 1, unit, team, dispatch);
      tileMoveCheck(grid, column - 1, row, unit, team, dispatch);
      tileMoveCheck(grid, column, row - 1, unit, team, dispatch);
      unit.stats.mov = mov;
    }
  }
}

function removeTileMoveCheck(grid, dispatch) {
  grid.forEach((each, column) => {
    each.forEach((each2, row) => {
      if (each2.canMove) {
        const action = {column: column, row: row, type: 'removeMove'}
        dispatch(action);
      }
    })
  })
}

export { tilePlaceCheck, tileMoveCheck, removeTileMoveCheck };
  