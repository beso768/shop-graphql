import React, { Component } from "react";
import { connect } from "react-redux";
import { removeItem, setItemQuantity } from "../../state/reducers/CartSlice";
const mapStateToProps = (state) => {
  return {
    activeCurrency: state.CurrencyReducer.activeCurrency,
  };
};
const mapDispatchToProps = {
  setItemQuantity,
  removeItem,
};

class ItemQuantity extends Component {
  handleClick(sign) {
    const { productId, setItemQuantity } = this.props;
    if (sign === "+") {
      setItemQuantity({ productId, type: "increment" });
    } else {
      setItemQuantity({ productId, type: "decrement" });
    }
  }

  render() {
    const { quantity } = this.props;
    const { menu } = this.props;
    return (
      <div className={menu ? "menu-quantity" : "page-quantity"}>
        <button onClick={() => this.handleClick("+")}>
          <span>+</span>
        </button>
        {quantity}
        <button onClick={() => this.handleClick("-")} disabled={quantity === 1}>
          <span>-</span>
        </button>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemQuantity);
