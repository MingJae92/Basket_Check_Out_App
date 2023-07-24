import React from 'react';

const PricingRules = ({ pricingRules }) => {
  return (
    <div>
      {/* Display pricing rules */}
      <h3>Pricing Rules:</h3>
      <ul>
        {Object.entries(pricingRules).map(([item, { unitPrice, specialPrice }]) => (
          <li key={item}>
            {/* Display unit price and special price (if available) for each item */}
            {item}: {unitPrice} pence {specialPrice ? `, ${specialPrice.quantity} for ${specialPrice.price} pence` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingRules;
