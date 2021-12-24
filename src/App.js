import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from "../src/components/pages/Cart";
import ProductDescription from "../src/components/pages/ProductDescription";
import ProductList from "../src/components/pages/ProductList";
import { ApifetchProductsByCategory } from "./api/StoreApi";
import Header from "./components/Header";
import { connect } from "react-redux";
import { fetchCategories } from "./state/reducers/CategoriesSlice";
import { fetchCurrencies } from "./state/reducers/CurrencySlice";
import { setActiveCurrency } from "./state/reducers/CurrencySlice";
const mapStateToProps = (state) => {
  return {
    // currencies: state.CurrencyReducer.currencies,
    categories: state.CategoriesReducer.categories,
    activeCategory: state.CategoriesReducer.activeCategory,
    // activeCurrency: state.CurrencyReducer.activeCurrency,
  };
};

const mapDispatchToProps = {
  fetchCategories,
  // fetchProducts,
  fetchCurrencies,
  setActiveCurrency,
};

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  // display() {
  //   let data = this.props.data;
  //   if (data.loading) {
  //     return <h1>Loading...</h1>;
  //   } else {
  //     return (
  //       <ul>
  //         {data.category.products.map((item) => (
  //           <li>{item.name}</li>
  //         ))}
  //       </ul>
  //     );
  //   }
  // }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <ProductList />
          </Route>
          <Route exact path="/product/:id">
            <ProductDescription />
          </Route>

          <Route path="/cart" element={<Cart />} />
        </Switch>
      </Router>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
