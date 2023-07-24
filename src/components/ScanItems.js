import React from 'react';

const ScanItems = ({ handleInputChange, basket }) => {
  return (
    <div>
      {/* Prompt the user to scan items */}
      <p>Scan items using individual letters (A, B, C, and D):</p>
      {/* Input field for scanning items */}
      <input type="text" value={basket} onChange={handleInputChange} />
    </div>
  );
};

export default ScanItems;
