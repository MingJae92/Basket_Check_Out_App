### Tell us about key decisions you made and what you'd do if you had more time

### Key decisions

1.I used React functional components along with hooks for state management (useState) to keep the code simple and concise.

2.The pricing rules are represented as an object, making it easy to add or modify item prices and special offers.

3.The calculateTotalPrice function processes the basket input, checks for special prices, and calculates the total price accordingly.

4.The handleInputChange function updates the basket state whenever the input changes.

5.The total price is displayed after clicking the "Calculate Total Price" button.

### If I was given more time,  there are several improvements and additions that could be made:

1.Unit tests could be added to ensure the correctness of the pricing calculations.
2.Error handling could be improved to handle invalid input or missing pricing rules more gracefully.
3.Styling and UI enhancements could be added to improve the overall user experience.
4.The special pricing logic could be generalized to support more complex pricing schemes, such as "Buy X, Get Y Free" or percentage discounts.
5.A product catalog could be implemented to dynamically fetch item details and pricing from an API (AWS Lambda or DynamoDB, for example).
