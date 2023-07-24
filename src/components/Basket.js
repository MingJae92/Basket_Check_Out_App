import React, { useState, useMemo, useEffect } from 'react';
import PricingRules from '../components/PricingRules';
import ScanItems from '../components/ScanItems';
import ScannedItems from '../components/ScannedItems';
import TotalPrice from '../components/TotalPrice';

function Basket() {
  // State variables with their initial values
  const [basket, setBasket] = useState(''); // Holds the scanned items as a string
  const [itemPrices, setItemPrices] = useState({}); // Stores the calculated prices for each item
  const [scannedItems, setScannedItems] = useState([]); // Array of scanned items with their prices
  const [isPricingRulesValid, setPricingRulesValid] = useState(true); // Flag to indicate if pricing rules are valid
  const [isTotalCalculated, setTotalCalculated] = useState(false); // Flag to indicate if the total is calculated
  const [totalPrice, setTotalPrice] = useState(0); // Holds the total price of scanned items

  // Pricing rules for each item, using useMemo to memoize the object so it's not recreated on every render
  const pricingRules = useMemo(() => ({
    A: { unitPrice: 50, specialPrice: { quantity: 3, price: 130 } },
    B: { unitPrice: 30, specialPrice: { quantity: 2, price: 45 } },
    C: { unitPrice: 20 },
    D: { unitPrice: 15 },
  }), []);

  // Function to validate if the pricing rules are correctly defined
  const validatePricingRules = (rules) => {
    for (const item of Object.keys(rules)) {
      const itemData = rules[item];
      if (!itemData || typeof itemData.unitPrice !== 'number') {
        return false;
      }
    }
    return true;
  };

  // useEffect to validate the pricing rules object on mount and whenever the pricingRules object changes
  useEffect(() => {
    setPricingRulesValid(validatePricingRules(pricingRules));
  }, [pricingRules]);

  // Function to recalculate item prices whenever the basket, pricing rules, or pricing rules validity changes
  const calculateItemPrices = () => {
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

    // Count the occurrences of each item in the basket
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

    // Convert the calculatedPrices object to an array of scanned items with prices
    const scannedItemsList = Object.entries(calculatedPrices).map(([item, price]) => ({
      item,
      price,
    }));
    setScannedItems(scannedItemsList);
  };

  // useEffect to recalculate item prices whenever the basket, pricing rules, or pricing rules validity changes
  useEffect(() => {
    calculateItemPrices();
  }, [basket, pricingRules, isPricingRulesValid]);

  // Event handler for handling changes to the input field
  const handleInputChange = (event) => {
    // Convert the input to uppercase and filter out characters not present in the pricing rules
    const input = event.target.value.toUpperCase();
    const allowedItems = Object.keys(pricingRules).join('');
    const filteredInput = input.split('').filter((char) => allowedItems.includes(char));
    setBasket(filteredInput.join(''));
    setTotalCalculated(false); // Reset total calculation status when input changes
  };

  // Event handler for calculating the total price of the scanned items
  const handleTotalClick = () => {
    const total = scannedItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
    setTotalCalculated(true);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout System!!!</h2>
      <PricingRules pricingRules={pricingRules} />
      <ScanItems handleInputChange={handleInputChange} basket={basket} />
      <ScannedItems scannedItems={scannedItems} isPricingRulesValid={isPricingRulesValid} />
      <TotalPrice totalPrice={totalPrice} isTotalCalculated={isTotalCalculated} />
      <button onClick={handleTotalClick}>Calculate Total</button>
    </div>
  );
}

export default Basket;
