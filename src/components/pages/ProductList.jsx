import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../state/reducers/ProductsSlice";
import ProductCard from "../ProductCard";

const mapStateToProps = (state) => {
  return {
    products: state.ProductsReducer.products,
    activeCategory: state.CategoriesReducer.activeCategory,
    status: state.ProductsReducer.status,
  };
};

const mapDispatchToProps = {
  fetchProducts,
};

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts(this.props.activeCategory || "all");
  }

  render() {
    const { activeCategory } = this.props;
    return (
      <div>
        <h2 className="product-category">{activeCategory}</h2>
        <ul className="product-list">
          {this.props.products?.map((product) => (
            <li
              key={product.id}
              style={{
                opacity: product.inStock ? "1" : "0.6",
              }}
            >
              <ProductCard data={product} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
