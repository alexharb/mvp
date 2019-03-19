var Unit = function(weapon) {
  this.title = '',
  this.type = 0, //0 is infantry, 1 is armor, 2 is flying, 3 is cavalier
  this.stats = {
    HP: 1,
    Atk: 1,
    Spd: 1,
    Def: 1,
    Res: 1,
    Mov: 1,
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