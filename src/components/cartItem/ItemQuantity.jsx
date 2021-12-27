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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     quantity: 1,
  //   };
  //   this.handleClick = this.handleClick.bind(this);
  // }
  handleClick(sign) {
    const { productId, setItemQuantity, quantity, removeItem } = this.props;

    if (sign === "+") {
      setItemQuantity({ productId, type: "increment" });
    } else {
      if (quantity > 1) {
        setItemQuantity({ productId, type: "decrement" });
      } else {
        removeItem(productId);
      }
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
