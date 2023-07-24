import React from 'react';

const PricingRulesList = ({ pricingRules }) => {
  return (
    <div>
      <h3>Pricing Rules:</h3>
      <ul>
        {Object.entries(pricingRules).map(([item, { unitPrice, specialPrice }]) => (
          <li key={item}>
            {item}: {unitPrice} pence{specialPrice ? `, ${specialPrice.quantity} for ${specialPrice.price} pence` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingRulesList;
