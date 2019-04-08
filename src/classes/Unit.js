var Unit = function(mov, weapon) {
  mov = Number(mov)
  let movement;
  this.type = mov; //0 is infantry, 1 is armor, 2 is flying, 3 is cavalier
  if (mov === 1) {
    movement = 1;
  } else if (mov === 3) {
    movement = 3;
  } else {
    movement = 2;
  }
  this.title = '',
  this.stats = {
    hp: 1,
    atk: 1,
    spd: 1,
    def: 1,
    res: 1,
    mov: movement,
  };
  this.weapon = weapon;
  this.assist = {text: 'this is a dummy data'};
  this.special = {text: 'this is a dummy data'};
  this.aSkill = {text: 'this is a dummy data'};
  this.bSkill = {text: 'this is a dummy data'};
  this.cSkill = {text: 'this is a dummy data'};
  this.sSeal = {text: 'this is a dummy data'};
  this.isPlaced = false;
  this.isSelected = false;
  this.team = 0;
}

export default Unit;