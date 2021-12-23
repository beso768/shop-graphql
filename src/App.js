import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "../src/components/pages/Cart";
import ProductDescription from "../src/components/pages/ProductDescription";
import ProductList from "../src/components/pages/ProductList";
import { ApifetchProductsByCategory } from "./api/StoreApi";
import Header from "./components/Header";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.changeCategory = this.changeCategory.bind(this);
  }

  changeCategory(category) {
    ApifetchProductsByCategory(category).then((data) =>
      this.setState({ data: data })
    );
  }
  componentDidMount() {
    ApifetchProductsByCategory("all").then((data) =>
      this.setState({ data: data })
    );
  }

  display() {
    let data = this.props.data;
    if (data.loading) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <ul>
          {data.category.products.map((item) => (
            <li>{item.name}</li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <Router>
        <Header changeCategory={this.changeCategory} />
        <ProductList />
        <Routes>
          <Route path="/" element={<ProductList data={this.state.data} />} />
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    );
  }
}
