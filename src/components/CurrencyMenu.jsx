import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import {
  fetchCurrencies,
  setActiveCurrency,
} from "../state/reducers/CurrencySlice";

const mapStateToProps = (state) => {
  const currency = state.CurrencyReducer;
  return {
    currency,
  };
};

const mapDispatchToProps = {
  setActiveCurrency,
  fetchCurrencies,
};

class CurrencyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
    this.currencyBox = createRef();
    this.operCurrencyMenu = this.operCurrencyMenu.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
  }

  closeHandler({ target }) {
    if (!this.currencyBox.current.contains(target)) {
      this.setState({ showMenu: false }, () =>
        document.removeEventListener("click", this.closeHandler)
      );
    }
  }

  operCurrencyMenu() {
    this.setState((prevState) => ({ showMenu: !prevState.showMenu }));
    document.addEventListener("click", this.closeHandler);
  }
  selectCurrency(currency) {
    this.props.setActiveCurrency(currency);
  }

  componentDidMount() {
    this.props.fetchCurrencies();
  }

  render() {
    const { showMenu } = this.state;
    const { currencies } = this.props.currency;
    const { activeCurrency } = this.props.currency;
    return (
      <div className="d-flex">
        <div
          ref={this.currencyBox}
          className="currency"
          onClick={this.operCurrencyMenu}
        >
          <span>{activeCurrency?.symbol}</span>
        </div>
        {showMenu && (
          <div className="currency-list">
            {currencies?.map((currency) => (
              <div
                key={currency.symbol}
                onClick={() =>
                  this.selectCurrency({
                    label: currency.label,
                    symbol: currency.symbol,
                  })
                }
              >
                {currency.symbol}
                <span className="currency-label">{currency.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyMenu);
