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
}

export default Basket