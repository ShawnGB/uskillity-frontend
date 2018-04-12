import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    return (
      <div>
        <label>Credit Card details</label>
        <CardElement style={{base: {fontSize: '18px'}}} />
      </div>
    );
  }
};

export default CardSection;
