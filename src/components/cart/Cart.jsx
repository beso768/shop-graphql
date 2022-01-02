import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { v4 as uuidv4 } from "uuid";

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
          cartItems.map((obj) => (
            <CartItem data={obj} key={uuidv4()} miniSize={miniSize || false} />
          ))
        ) : (
          <h1>No products.</h1>
        )}
      </section>
    );
  }
}
export default connect(mapStateToProps, null)(Cart);
