import React, { Component } from "react";
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    activeCurrency: state.CurrencyReducer.activeCurrency,
  };
};

class Price extends Component {
  render() {
    const { prices } = this.props;
    const price = prices?.find(
      (price) => price.currency.label === this.props.activeCurrency.label
    );

    return (
      <>
        {price && (
          <div className="display-price">
            {price.currency.symbol} {price.amount}
          </div>
        )}
      </>
    );
  }
}
export default connect(mapStateToProps)(Price);
