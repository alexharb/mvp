import React, { useState, useEffect } from 'react';

function UnitView(props) {
  return(
    <div className="unitView">
      <p>
        HP: {props.unit.stats.HP}
      </p>
    </div>
  )
}

export default UnitView;