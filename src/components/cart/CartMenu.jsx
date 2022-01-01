import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { setNewAttribute } from "../../state/reducers/CartSlice";
import { v4 as uuidv4 } from "uuid";
import cart from "../../icons/cart.png";
import CartMenuItem from "./CartMenuItem";
import "./Cart.css";
import { Link } from "react-router-dom";

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
    document.addEventListener("click", this.closeHandler, { capture: true });
  }

  render() {
    const { showMenu } = this.state;
    const cartItems = Object.values(this.props.cart);

    return (
      <div className="d-flex adssas" ref={cartBox}>
        <div onClick={this.operCartMenu} className="cart-icon">
          <img src={cart} alt="cart" />
        </div>
        {showMenu && (
          <>
            <div className="cart-menu">
              <h5>
                My Bag , <span>{cartItems.length} Items</span>
              </h5>
              <div>
                {cartItems && cartItems.length > 0 ? (
                  <>
                    {cartItems.map((obj) => (
                      <CartMenuItem data={obj} key={uuidv4()} />
                    ))}
                    <h5>
                      Total , <span>{this.props.activeCurrency.symbol}</span>
                    </h5>
                  </>
                ) : (
                  <h1>No products.</h1>
                )}
                <div className="buttons">
                  <Link to="/cart" className="view-bag">
                    View Bag
                  </Link>
                  <button className="checkout">Checkout</button>
                </div>
              </div>
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
