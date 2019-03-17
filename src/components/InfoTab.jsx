import React, { useState, useEffect } from 'react';

function InfoTab() {

  return(
    <div id="infoTab">
      Light Green is land - anyone can move freely on it <br></br><br></br>
      Dark Green is a forest.  Infantry units must stand adjacent to a forest to enter it. Cavalry units cannot enter forests.<br></br><br></br>
      Blue is water (or a mountain or whatever).  Only fliers may pass over water.<br></br><br></br>
      Gray is a wall.  Walls completely block movement.<br></br><br></br>
      Orange is a trench.  Trenches are like forests for cavaliers.  They must be adjacent to enter that space.<br></br><br></br>
      Brown is terrain that can be destroyed by an attack.  Once destroyed, it becomes land.<br></br><br></br>
    </div>
  )
}

export default InfoTab