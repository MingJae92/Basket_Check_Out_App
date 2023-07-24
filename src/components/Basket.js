import React, { useState, useMemo, useEffect } from 'react';
import PricingRulesList from './components/PricingRulesList';
import ScannedItemsList from './components/ScannedItemsList';

const PRICING_RULES = {
  A: { unitPrice: 50, specialPrice: { quantity: 3, price: 130 } },
  B: { unitPrice: 30, specialPrice: { quantity: 2, price: 45 } },
  C: { unitPrice: 20 },
  D: { unitPrice: 15 },
};

function Basket() {
  const [basket, setBasket] = useState('');
  const [isPricingRulesValid, setPricingRulesValid] = useState(true);
  const [isTotalCalculated, setTotalCalculated] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setPricingRulesValid(validatePricingRules(PRICING_RULES));
  }, []);

  const { calculatedPrices, scannedItems } = useMemo(() => calculatedPrices(basket, PRICING_RULES), [
    basket,
    isPricingRulesValid,
  ]);

  useEffect(() => {
    if (!isPricingRulesValid) {
      setTotalCalculated(false);
      setTotalPrice(0);
      return;
    }

    const total = scannedItems.reduce((acc, { price }) => acc + price, 0);
    setTotalPrice(total);
    setTotalCalculated(true);
  }, [scannedItems, isPricingRulesValid]);

  const handleInputChange = (event) => {
    const input = event.target.value.toUpperCase();
    const allowedItems = Object.keys(PRICING_RULES).join('');
    const filteredInput = input.split('').filter((char) => allowedItems.includes(char));
    setBasket(filteredInput.join(''));
    setTotalCalculated(false);
  };

  const handleTotalClick = () => {
    setTotalCalculated(true);
  };





}

export default Basket