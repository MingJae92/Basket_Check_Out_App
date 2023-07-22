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

    const items = basket.split('');
    const itemCounts = new Map();
    const calculatedPrices = {};

    items.forEach((item) => {
      itemCounts.set(item, (itemCounts.get(item) || 0) + 1);
    });

    let totalPrice = 0;

    for (const [item, count] of itemCounts) {
      try {
        const itemData = pricingRules[item];
        if (!itemData) {
          throw new Error(`Item ${item} is not found in the pricing rules.`);
        }

        const { unitPrice, specialPrice } = itemData;
        let itemPrice;

        if (specialPrice) {
          const { quantity, price } = specialPrice;
          const specialPriceGroups = Math.floor(count / quantity);
          const remainder = count % quantity;
          itemPrice = specialPriceGroups * price + remainder * unitPrice;
          totalPrice += itemPrice;
        } else {
          itemPrice = count * unitPrice;
          totalPrice += itemPrice;
        }

        calculatedPrices[item] = itemPrice;
      } catch (error) {
        console.error(error.message);
        setPricingRulesValid(false);
      }
    }
    setItemPrices(calculatedPrices);

    const scannedItemsList = Object.entries(calculatedPrices).map(([item, price]) => ({
      item,
      price,
    }));
    setScannedItems(scannedItemsList);

  }, [basket, pricingRules, isPricingRulesValid]);

  const handleInputChange = (event) => {
    const input = event.target.value.toUpperCase();
    const allowedItems = Object.keys(pricingRules).join('');
    const filteredInput = input.split('').filter((char) => allowedItems.includes(char));
    setBasket(filteredInput.join(''));
    setTotalCalculated(false); // Reset total calculation status when input changes
  };

  const handleTotalClick = () => {

    const total = scannedItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
    setTotalCalculated(true);
  };

  return (
    <div>
      <h2>Checkout System!!!</h2>
      <h3>Pricing Rules:</h3>
      <ul>
        {Object.entries(pricingRules).map(([item, { unitPrice, specialPrice }]) => (
          <li key={item}>
            {item}: {unitPrice} pence {specialPrice ? `, ${specialPrice.quantity} for ${specialPrice.price} pence` : ''}
          </li>
        ))}
      </ul>
      <p>Scan items using individual letters (A, B, C, and D):</p>
      <input type="text" value={basket} onChange={handleInputChange} />

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
    </div>
  )
}

export default Basket