import React from 'react';

function ScanItems({ handleInputChange, basket }) {
  return (
    <>
      <p>Scan items using individual letters (A, B, C, and D):</p>
      <input type="text" value={basket} onChange={handleInputChange} />
    </>
  );
}

export default ScanItems;
