import React, { useState, useMemo, useEffect } from 'react';

import React from 'react'

function Basket() {
  const [basket, setBasket] = useState('');
    const [itemPrices, setItemPrices] = useState({});
    const [scannedItems, setScannedItems] = useState([]);
    const [isPricingRulesValid, setPricingRulesValid] = useState(true);
    const [isTotalCalculated, setTotalCalculated] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const pricingRules = useMemo(
      () => ({
        A: { unitPrice: 50, specialPrice: { quantity: 3, price: 130 } },
        B: { unitPrice: 30, specialPrice: { quantity: 2, price: 45 } },
        C: { unitPrice: 20 },
        D: { unitPrice: 15 }, 
      }),
      []
    );
    useEffect(() => {
      setPricingRulesValid(validatePricingRules(pricingRules));
    }, [pricingRules]);

    const validatePricingRules = (rules) => {
      for (const item of Object.keys(rules)) {
        const itemData = rules[item];
        if (!itemData || typeof itemData.unitPrice !== 'number') {
          return false;
        }
      }
      return true;
    };

    useEffect(() => {
      if (!isPricingRulesValid) {
        // Reset values when pricing rules are not valid
        setTotalCalculated(false);
        setTotalPrice(0);
        setItemPrices({});
        setScannedItems([]);
        return;
      }
  
      
    }, []);
    
  return (
    <div>
      <h1>Basket</h1>
    </div>
  )
}

export default Basket