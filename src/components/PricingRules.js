import React from 'react';

function PricingRules({ pricingRules }) {
  return (
    <>
      <h3>Pricing Rules:</h3>
      <ul>
        {Object.entries(pricingRules).map(([item, { unitPrice, specialPrice }]) => (
          <li key={item}>
            {item}: {unitPrice} pence {specialPrice ? `, ${specialPrice.quantity} for ${specialPrice.price} pence` : ''}
          </li>
        ))}
      </ul>
    </>
  );
}

export default PricingRules;
