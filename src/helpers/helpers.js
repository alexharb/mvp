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

function checkTileLegality(tile, unit, mov) {
  const { terrain, isStarter, unitPlaced } = tile
  let legal;
  if (terrain === 3 || terrain === 5 || (isStarter && unitPlaced !== unit)) {
    legal = false;
    unit.stats.mov = 0;
  } else if (unit.type === 3 && terrain === 1) {
    legal = false;
    unit.stats.mov = 0;
  } else if (unit.type === 2) {
    legal = true;
  } else if (terrain === 2) {
    legal = false;
    unit.stats.mov = 0;
  } else if ((mov === 1 && unit.type === 0 && terrain === 1)
             || (mov === 2 && unit.type === 3 && terrain === 4)) {
    legal = true;
    unit.stats.mov = 0;
  } else if ((unit.type === 0 && terrain === 1 && mov < 1) || (unit.type === 3 && terrain === 4 && mov < 2)) {
    legal = false;
    unit.stats.mov = 0;
  } else {
    legal = true;
  }
  return legal;
}

function tileMoveCheck(grid, column, row, unit, team, dispatch) {
  const { range } = unit.weapon;
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
    if (mov >= 0 && !tile.canMove) {
      canMove = checkTileLegality(tile, unit, mov);
    }
    if (canMove) {
      const action = {column: column, row: row, type: 'canMove'}
      dispatch(action);
      tileAttackCheck(grid, column + range, row, team, dispatch);
      tileAttackCheck(grid, column, row + range, team, dispatch);
      tileAttackCheck(grid, column - range, row, team, dispatch);
      tileAttackCheck(grid, column, row - range, team, dispatch);
    }
    unit.stats.mov--;
    tileMoveCheck(grid, column + 1, row, unit, team, dispatch);
    tileMoveCheck(grid, column, row + 1, unit, team, dispatch);
    tileMoveCheck(grid, column - 1, row, unit, team, dispatch);
    tileMoveCheck(grid, column, row - 1, unit, team, dispatch);
    unit.stats.mov = mov;
  }
}

function tileAttackCheck(grid, column, row, team, dispatch) {
  if (column < 0 || column >= grid.length || row < 0 || row >= grid[0].length) {
    return false;
  } else {
    let tile = grid[column][row];
    if(!tile.canMove) {
      const action = {column: column, row: row, type: 'canAttack'}
      dispatch(action);
    }
  }
}

function removeTileMoveCheck(grid, dispatch) {
  grid.forEach((each, column) => {
    each.forEach((each2, row) => {
      if (each2.canMove || each2.canAttack) {
        const action = {column: column, row: row, type: 'removeMove'}
        dispatch(action);
      }
    });
  });
}

export { tilePlaceCheck, tileMoveCheck, removeTileMoveCheck, tileAttackCheck };
  