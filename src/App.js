import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Cart from "../src/components/pages/Cart";
import ProductDescription from "../src/components/pages/ProductDescription";
import ProductList from "../src/components/pages/ProductList";
import Header from "./components/Header";
import NotFound from "./components/pages/NotFound";
import { fetchCurrencies } from "./state/reducers/CurrencySlice";

const mapStateToProps = (state) => {
  return {
    categories: state.CategoriesReducer.categories,
  };
};

const mapDispatchToProps = {
  fetchCurrencies,
};

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrencies();
  }

  render() {
    const { categories } = this.props;
    return (
      <Router>
        <Header />
        <Switch>
          {categories.map(({ name }) => (
            <Route exact path={`/${name}`} key={name}>
              <ProductList />
            </Route>
          ))}
          <Route exact path={`/:category/:id`}>
            <ProductDescription />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Redirect exact from="/" to="/all" />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
