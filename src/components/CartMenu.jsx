import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { setNewAttribute } from "../state/reducers/CartSlice";
import CartItem from "./cartItem/CartItem";
import cart from "../icons/cart.png";
import CartMenuItem from "./cartItem/CartMenuItem";
const mapStateToProps = (state) => {
  return {
    activeCurrency: state.CurrencyReducer.activeCurrency,
    cart: state.CartReducer,
  };
};
const mapDispatchToProps = {
  setNewAttribute,
};

const cartBox = createRef();

class CartMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
    this.operCartMenu = this.operCartMenu.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
  }

  closeHandler({ target }) {
    if (!cartBox.current.contains(target)) {
      this.setState({ showMenu: false }, () =>
        document.removeEventListener("click", this.closeHandler)
      );
    }
  }

  operCartMenu() {
    this.setState((prevState) => ({ showMenu: !prevState.showMenu }));
    document.addEventListener("click", this.closeHandler);
  }

  render() {
    const { showMenu } = this.state;
    const cartItems = Object.values(this.props.cart);

    return (
      <div className="d-flex" ref={cartBox}>
        <div onClick={this.operCartMenu} className="cart-icon">
          <img src={cart} alt="cart" />
        </div>
        {showMenu && (
          <>
            <div className="cart-menu">
              <h5>
                My Bag , <span>{cartItems.length} Items</span>
              </h5>
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((obj) => <CartMenuItem data={obj} />)
              ) : (
                <h1>No products.</h1>
              )}
            </div>
            <div
              className="cart-backdrop"
              onClick={() => this.setState({ showMenu: false })}
            ></div>
          </>
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartMenu);
