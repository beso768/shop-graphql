import React, { Component } from "react";
import "./Cart.css";
import { connect } from "react-redux";

import ItemQuantity from "./ItemQuantity";
import Price from "../Price";
import Attributes from "./CartAttributes";

const mapStateToProps = (state) => {
  return {
    activeCurrency: state.CurrencyReducer.activeCurrency,
  };
};

class CartMenuItem extends Component {
  render() {
    const { product, selectedAttributes, quantity } = this.props.data;
    return (
      <div className="menu-item-wrapper">
        {product && (
          <>
            <div className="left menu-item">
              <h3>{product.name}</h3>
              <h4>{product.brand}</h4>
              <div className="attribute">
                <Price prices={product.prices} />
              </div>
              <Attributes
                product={product}
                selectedAttributes={selectedAttributes}
              />
            </div>
            <div className="right-menu-item">
              <ItemQuantity
                productId={product.id}
                quantity={quantity}
                menu={true}
              />
              <div className="img-wrapper">
                <img src={product.gallery[0]} alt="product-img" />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, null)(CartMenuItem);
