var Unit = function(mov, weapon) {
  let movement;
  this.type = Number(mov); //0 is infantry, 1 is armor, 2 is flying, 3 is cavalier
  if (mov = 1) {
    movement = 1;
  } else if (mov = 3) {
    movement = 3;
  } else {
    movement = 2;
  }
  this.title = '',
  this.stats = {
    HP: 1,
    Atk: 1,
    Spd: 1,
    Def: 1,
    Res: 1,
    Mov: movement,
  };
  this.weapon = weapon;
  this.assist = {};
  this.special = {};
  this.aSkill = {};
  this.bSkill = {};
  this.cSkill = {};
  this.sSeal = {};
  this.isPlaced = false;
}

export default Unit;