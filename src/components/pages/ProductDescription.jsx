import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ProductInfo from "../products/ProductInfo";
import { fetchProductById } from "./../../state/reducers/ProductSlice";
import Slider from "./../products/Slider";
import NotFound from "./NotFound";

const mapStateToProps = (state) => {
  return {
    product: state.ProductReducer.product,
    status: state.ProductReducer.status,
  };
};
const mapDispatchToProps = {
  fetchProductById,
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
