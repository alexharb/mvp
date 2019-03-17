var Unit = function() {
  this.stats = {
    HP: 1,
    Atk: 1,
    Spd: 1,
    Def: 1,
    Res: 1,
    Mov: 1,
  };
  this.color = {};
  this.weapon = {
    range: 1,
    type: 0, //0 is melee, 1 is magic, 2 is bow, 3 is shuriken, 4 is beast, 5 is dragon
  };
  this.assist = {};
  this.special = {};
  this.aSkill = {};
  this.bSkill = {};
  this.cSkill = {};
  this.sSeal = {};
}

export default Unit;