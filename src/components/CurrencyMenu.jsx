import React, { Component } from "react";
import { connect } from "react-redux";
import currency from "../icons/currency.png";
import { setActiveCurrency } from "../state/reducers/CurrencySlice";
import { fetchCurrencies } from "../state/reducers/CurrencySlice";
const mapStateToProps = (state) => {
  const currency = state.CurrencyReducer;
  return {
    currency,
  };
};

const mapDispatchToProps = {
  setActiveCurrency,
};

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
    this.operCurrencyMenu = this.operCurrencyMenu.bind(this);
  }

  componentDidMount() {
    fetchCurrencies();
  }

  operCurrencyMenu() {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }));
  }
  render() {
    const { showMenu } = this.state;
    console.log(this.props);
    return (
      <div className="currency" onClick={this.operCurrencyMenu}>
        <div>
          <img src={currency} alt="currency" />
        </div>
        <div style={showMenu ? { display: "block" } : { display: "none" }}>
          <h1>dasdasd</h1>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
