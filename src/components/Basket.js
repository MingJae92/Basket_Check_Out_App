import React, { useState, useMemo, useEffect } from 'react';


function Basket() {
  const [basket, setBasket] = useState('');
  const [itemPrices, setItemPrices] = useState({});
  const [scannedItems, setScannedItems] = useState([]);
  const [isPricingRulesValid, setPricingRulesValid] = useState(true);
  const [isTotalCalculated, setTotalCalculated] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setPricingRulesValid(validatePricingRules(pricingRules));
  }, [pricingRules]);

  const pricingRules = useMemo(
    () => ({
      A: { unitPrice: 50, specialPrice: { quantity: 3, price: 130 } },
      B: { unitPrice: 30, specialPrice: { quantity: 2, price: 45 } },
      C: { unitPrice: 20 },
      D: { unitPrice: 15 },
    }),
    []
  );
  return (
    <div>
      <h1>Check Out System</h1>
      <h3>Pricing Rules:</h3>
      <ul>
        {Object.entries(pricingRules).map(([item, { unitPrice, specialPrice }]) => (
          <li key={item}>
            {item}: {unitPrice} pence {specialPrice ? `, ${specialPrice.quantity} for ${specialPrice.price} pence` : ''}
          </li>
        ))}
      </ul>
      <p>Scan items using individual letters (A, B, C, and D):</p>
    </div>
  )
}

export default Basket