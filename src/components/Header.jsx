import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../icons/logo.png";
import currency from "../icons/currency.png";
import cart from "../icons/cart.png";
import "../App.css";
import { connect } from "react-redux";
import { setActiveCategory } from "../state/reducers/CategoriesSlice";
import { fetchProducts } from "../state/reducers/ProductSlice";

const mapStateToProps = (state) => {
  const categories = state.CategoriesReducer.categories;
  return {
    categories,
  };
};

const mapDispatchToProps = {
  setActiveCategory,
  fetchProducts,
};

class Header extends Component {
  render() {
    console.log(this.props);
    return (
      <header>
        <nav>
          <ul className="d-flex">
            <li
              className="active"
              onClick={() => {
                this.props.setActiveCategory("all");
                this.props.fetchProducts("all");
              }}
            >
              All
            </li>
            <li
              onClick={() => {
                this.props.setActiveCategory("tech");
                this.props.fetchProducts("tech");
              }}
            >
              Tech
            </li>
            <li onClick={() => this.props.setActiveCategory("clothes")}>
              Clothes
            </li>
          </ul>
        </nav>
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className="d-flex">
          <div className="currency">
            <img src={currency} alt="currency" />
          </div>
          <div className="cart">
            <NavLink to="/cart">
              <img src={cart} alt="cart" />
            </NavLink>
          </div>
        </div>
      </header>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
