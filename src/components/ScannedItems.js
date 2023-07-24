import React from 'react';

function ScannedItems({ scannedItems, isPricingRulesValid }) {
  return (
    <>
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
        <p>Error: Incorrect pricing rules!</p>
      )}
    </>
  );
}

export default ScannedItems;
