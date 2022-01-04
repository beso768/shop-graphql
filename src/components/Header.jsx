import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "../App.css";
import logo from "../icons/logo.png";
import { setActiveCategory } from "../state/reducers/CategoriesSlice";
import { fetchProducts } from "../state/reducers/ProductsSlice";
import { fetchCategories } from "./../state/reducers/CategoriesSlice";
import CartMenu from "./cart/CartMenu";
import CurrencyMenu from "./CurrencyMenu";

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
  fetchCategories,
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(category) {
    if (this.props.activeCategory !== category) {
      this.props.setActiveCategory(category);
      this.props.fetchProducts(category);
    }
  }
  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    const { categories } = this.props;
    return (
      <header>
        <nav>
          <ul className="d-flex">
            {categories?.map(({ name }) => (
              <li
                key={name}
                onClick={() => {
                  this.handleClick(name);
                }}
              >
                <NavLink
                  to={`/${name}`}
                  activeStyle={{
                    color: "#5ece7b",
                  }}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="logo" onClick={() => this.handleClick("all")}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="d-flex menu-icons">
          <CurrencyMenu />
          <CartMenu />
        </div>
      </header>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
