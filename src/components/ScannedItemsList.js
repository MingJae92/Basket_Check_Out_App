import React from 'react';

const ScannedItemsList = ({ scannedItems }) => {
  return (
    <div>
      <h3>Item Prices:</h3>
      <ul>
        {scannedItems.map(({ id, item, price }) => (
          <li key={id}>
            {item}: {price} pence
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScannedItemsList;
