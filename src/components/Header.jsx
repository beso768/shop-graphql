import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../icons/logo.png";

import cart from "../icons/cart.png";
import "../App.css";
import { connect } from "react-redux";
import { setActiveCategory } from "../state/reducers/CategoriesSlice";
import { fetchProducts } from "../state/reducers/ProductsSlice";
import CurrencySwitcher from "./CurrencyMenu";

const mapStateToProps = (state) => {
  const categories = state.CategoriesReducer.categories;
  const activeCategory = state.CategoriesReducer.activeCategory;
  return {
    categories,
    activeCategory,
  };
};

const mapDispatchToProps = {
  setActiveCategory,
  fetchProducts,
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(category) {
    this.props.setActiveCategory(category);
    this.props.fetchProducts(category);
  }

  render() {
    const { categories } = this.props;
    const { activeCategory } = this.props;
    return (
      <header>
        <nav>
          <ul className="d-flex">
            {categories?.map(({ name }) => (
              <li
                className={activeCategory === name ? "active" : ""}
                key={name}
                onClick={() => {
                  this.handleClick(name);
                }}
              >
                <Link to="/">{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className="d-flex">
          <CurrencySwitcher />
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
