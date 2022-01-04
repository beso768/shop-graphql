import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";

const mapStateToProps = (state) => {
  return {
    cart: state.CartReducer,
  };
};
class Cart extends Component {
  render() {
    const { miniSize } = this.props; //miniSize property used for menu items
    const cartItems = Object.values(this.props.cart);
    return (
      <section>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((obj, i) => (
            <CartItem data={obj} key={i} miniSize={miniSize || false} />
          ))
        ) : (
          <h1>No products.</h1>
        )}
      </section>
    );
  }
}
export default connect(mapStateToProps, null)(Cart);
