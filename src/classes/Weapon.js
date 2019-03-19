var Weapon = function(weapon, color) {
  this.type = weapon;
  if (weapon > 2) {
    this.color = color;
  }
  if (weapon < 2) {
    this.range = 1;
    this.damage = 0; //0 is physical, 1 is magical
    this.color = weapon;
  } else if (weapon === 3) {
    this.range = 2;
    this.damage = 1
  } else if (weapon < 6) {
    this.range = 2;
    this.damage = 0;
  } else {
    this.range = 1;
    this.damage = 1;
  }
}

export default Weapon;