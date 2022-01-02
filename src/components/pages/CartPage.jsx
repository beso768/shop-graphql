import React, { Component } from "react";
import Cart from "../cart/Cart";

export default class CartPage extends Component {
  render() {
    return (
      <section>
        <h2 className="page-title">Cart</h2>
        <Cart />
      </section>
    );
  }
}
