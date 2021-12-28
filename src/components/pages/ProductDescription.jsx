import React, { Component } from "react";

import {
  fetchProductById,
  cleanProduct,
} from "./../../state/reducers/ProductSlice";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Slider from "./../Slider";
import ProductInfo from "../ProductInfo";
import NotFound from "./NotFound";

const mapStateToProps = (state) => {
  return {
    product: state.ProductReducer.product,
    status: state.ProductReducer.status,
  };
};
const mapDispatchToProps = {
  fetchProductById,
  cleanProduct,
};
class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: [],
    };
  }

  componentDidMount() {
    // fetch product by id
    this.props.fetchProductById(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.cleanProduct();
  }

  render() {
    const { loading, success, error } = this.props.status;
    const { product } = this.props;

    return (
      <>
        {loading ? (
          <em>Loading...</em>
        ) : success && product ? (
          <section className="product-wrapper">
            <Slider product={product} />
            <ProductInfo product={product} />
          </section>
        ) : error ? (
          <h1>Something went wrong</h1>
        ) : (
          <NotFound />
        )}
      </>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDescription));
