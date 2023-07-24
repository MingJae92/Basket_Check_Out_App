import React from 'react';

const TotalPrice = ({ totalPrice, isTotalCalculated }) => {
  return (
    <div>
      {/* Show the total price if it is calculated */}
      {isTotalCalculated && <p>Total Price: {totalPrice} pence</p>}
    </div>
  );
};

export default TotalPrice;
