import React, { Component } from "react";
import "./Cart.css";
import { connect } from "react-redux";

import ItemQuantity from "./ItemQuantity";
import Price from "../Price";
import Attributes from "./CartAttributes";
import { removeItem } from "../../state/reducers/CartSlice";

const mapStateToProps = (state) => {
  return {
    activeCurrency: state.CurrencyReducer.activeCurrency,
  };
};
const mapDispatchToProps = {
  removeItem,
};
class CartMenuItem extends Component {
  render() {
    const { removeItem } = this.props;
    const { product, selectedAttributes, quantity } = this.props.data;
    return (
      <div className="menu-item-wrapper">
        {product && (
          <>
            <button onClick={() => removeItem(product.id)}>Delte</button>
            <div className="left menu-item">
              <h3>{product.name}</h3>
              <h4>{product.brand}</h4>
              <div className="price">
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
export default connect(mapStateToProps, mapDispatchToProps)(CartMenuItem);
