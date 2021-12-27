import React, { Component } from "react";

import { fetchProductById } from "./../../state/reducers/ProductSlice";
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
    const { status } = this.props;
    const { product } = this.props;
    return (
      <>
        {status?.loading ? (
          <h1>loading</h1>
        ) : !product ? (
          <NotFound />
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
