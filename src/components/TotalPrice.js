import React from 'react';

function TotalPrice({ totalPrice, isTotalCalculated }) {
  return isTotalCalculated && <p>Total Price: {totalPrice} pence</p>;
}

export default TotalPrice;
