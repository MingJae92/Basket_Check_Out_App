import React, { memo } from 'react';

const ScannedItems = memo(({ scannedItems, isPricingRulesValid }) => {
  return (
    <div>
      {/* Display scanned items and their prices if pricing rules are valid */}
      {isPricingRulesValid ? (
        <>
          <h3>Item Prices:</h3>
          <ul>
            {scannedItems.map(({ item, price }) => (
              <li key={item}>
                {item}: {price} pence
              </li>
            ))}
          </ul>
        </>
      ) : (
        // Show an error message if pricing rules are not valid
        <p>Error: Incorrect pricing rules!</p>
      )}
    </div>
  );
});

export default ScannedItems;
