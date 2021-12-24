import React, { Component } from "react";

import { fetchProductById } from "./../../state/reducers/ProductSlice";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Slider from "./../Slider";
import ProductInfo from "../ProductInfo";

const mapStateToProps = (state) => {
  return {
    // activeCurrency: state.CurrencyReducer.activeCurrency,
    product: state.ProductReducer.product,
    status: state.ProductReducer.status,
  };
};
const mapDispatchToProps = {
  fetchProductById,
  // addItemToCart,
};
class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: [],
    };
  }
  currency() {
    const prices = this.props.product?.prices;
    const currentLabel = "USD";
    if (prices) {
      const price = prices.find((item) => item.currency.label === currentLabel);
    }
  }
  componentDidMount() {
    // fetch product by id
    this.props.fetchProductById(this.props.match.params.id);
  }

  render() {
    const { status } = this.props;
    const { product } = this.props;
    this.currency();
    return (
      <>
        {status?.loading && Object.keys(product).length === 0 ? (
          <h1>loading</h1>
        ) : (
          <div className="d-flex">
            <Slider product={product} />
            <ProductInfo product={product} />
          </div>
        )}
      </>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDescription));
