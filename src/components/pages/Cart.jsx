import React, { Component } from "react";
import { connect } from "react-redux";
import { setNewAttribute } from "../../state/reducers/CartSlice";
import CartItem from "../cartItem/CartItem";

const mapStateToProps = (state) => {
  return {
    activeCurrency: state.CurrencyReducer.activeCurrency,
    cart: state.CartReducer,
  };
};
const mapDispatchToProps = {
  setNewAttribute,
};

class Cart extends Component {
  render() {
    const cartItems = Object.values(this.props.cart);
    return (
      <div>
        <h2 className="page-title">Cart</h2>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((obj) => <CartItem data={obj} />)
        ) : (
          <h1>No products.</h1>
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
