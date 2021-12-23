import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../state/reducers/ProductSlice";

const mapStateToProps = (state) => {
  return {
    products: state.ProductsReducer.products,
    activeCategory: state.CategoriesReducer.activeCategory,
  };
};

const mapDispatchToProps = {
  fetchProducts,
};

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts(
      this.props.activeCategory === "all" ? "" : this.props.activeCategory
    );
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <ul>
          {this.props.products?.map((product) => (
            <li>{product.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
