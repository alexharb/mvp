import React, { useState, useEffect } from 'react';

function UnitView(props) {
  const { unit, team } = props;

  return(
    <div className={`unitView ${team}`}>
      <p>
        {unit.title}
      </p>
    </div>
  )
}

export default UnitView;