import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cart from "../../icons/cart.png";
import { setNewAttribute, checkout } from "../../state/reducers/CartSlice";
import Cart from "./Cart";
import "./Cart.css";

const mapStateToProps = (state) => {
  return {
    cart: state.CartReducer,
  };
};
const mapDispatchToProps = {
  setNewAttribute,
  checkout,
};

class CartMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
    this.cartBox = createRef();
    this.operCartMenu = this.operCartMenu.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
  }

  closeHandler({ target }) {
    if (!this.cartBox.current.contains(target)) {
      this.setState({ showMenu: false }, () =>
        document.removeEventListener("click", this.closeHandler, {
          capture: true,
        })
      );
    }
  }

  operCartMenu() {
    this.setState((prevState) => ({ showMenu: !prevState.showMenu }));
    document.addEventListener("click", this.closeHandler, { capture: true });
  }

  render() {
    const { showMenu } = this.state;
    const cartItems = Object.values(this.props.cart);

    return (
      <>
        <div className="d-flex" ref={this.cartBox}>
          <div onClick={this.operCartMenu} className="cart-icon">
            <img src={cart} alt="cart" />
            {cartItems.length > 0 && (
              <div className="icon-quantity">{cartItems.length}</div>
            )}
          </div>
          {showMenu && (
            <>
              <div className="cart-menu">
                <h5>
                  My Bag , <span>{cartItems.length} Items</span>
                </h5>
                <div>
                  <Cart miniSize={true} />
                  <div className="buttons">
                    <Link to="/cart" className="view-bag">
                      View Bag
                    </Link>
                    <button
                      className="checkout"
                      onClick={() => this.props.checkout()}
                      style={{ opacity: cartItems.length === 0 ? "0.5" : "1" }}
                      disabled={cartItems.length === 0}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div
          className="cart-backdrop"
          style={{ display: showMenu ? "block" : "none" }}
        ></div>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartMenu);
