import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cartImg from "../../icons/cart.png";
import { setNewAttribute, checkout } from "../../state/reducers/CartSlice";
import Cart from "./Cart";
import "./Cart.css";

const mapStateToProps = (state) => {
  return {
    activeCurrency: state.CurrencyReducer.activeCurrency,
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
    this.clickHandler = this.clickHandler.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  clickHandler({ target }) {
    if (
      !this.cartBox.current.contains(target) ||
      target.className === "view-bag"
    ) {
      this.setState({ showMenu: false }, () =>
        document.removeEventListener("click", this.clickHandler)
      );
    }
  }
  scrollHandler() {
    this.setState({ showMenu: false }, () =>
      document.removeEventListener("scroll", this.scrollHandler)
    );
  }

  operCartMenu() {
    this.setState((prevState) => ({ showMenu: !prevState.showMenu }));
    document.addEventListener("click", this.clickHandler);
    document.addEventListener("scroll", this.scrollHandler);
  }

  calcTotal() {
    const cartItems = Object.values(this.props.cart);
    let total = 0;
    cartItems.forEach((item) => {
      const price = item.product.prices.find(
        (price) => price.currency.label === this.props.activeCurrency.label
      );
      total += item.quantity * price.amount;
    });
    return total.toFixed(2);
  }

  render() {
    const { showMenu } = this.state;
    const { cart } = this.props;
    const cartItems = Object.values(cart);
    let total = this.calcTotal();

    return (
      <>
        <div className="d-flex" ref={this.cartBox}>
          <div onClick={this.operCartMenu} className="cart-icon">
            <img src={cartImg} alt="cart" />
            {cartItems.length > 0 && (
              <div className="icon-quantity">{cartItems.length}</div>
            )}
          </div>
          {showMenu && (
            <>
              <div className="cart-menu">
                <h5 className="menu-title">
                  <strong>My Bag </strong>, {cartItems.length} Items
                </h5>
                <div>
                  <Cart miniSize={true} />
                  <div className="total-amount">
                    <div>Total:</div>
                    <div>
                      {this.props.activeCurrency.symbol} {total}
                    </div>
                  </div>
                  <div className="buttons">
                    <Link to="/cart" className="view-bag">
                      View Bag
                    </Link>
                    <button
                      className={`checkout ${
                        cartItems.length === 0 ? "disabled" : ""
                      }`}
                      onClick={() => this.props.checkout()}
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
        <div className={`cart-backdrop ${showMenu ? "show" : ""}`}></div>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartMenu);
