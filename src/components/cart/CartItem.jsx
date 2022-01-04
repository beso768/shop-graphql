import React, { Component } from "react";
import "./Cart.css";
import { connect } from "react-redux";
import { setNewAttribute, removeItem } from "../../state/reducers/CartSlice";
import ItemSlider from "./ItemSlider";
import ItemQuantity from "./ItemQuantity";
import Price from "../Price";
import Attributes from "./CartAttributes";
import trash from "../../icons/trash.svg";
const mapStateToProps = (state) => {
  return {
    activeCurrency: state.CurrencyReducer.activeCurrency,
  };
};
const mapDispatchToProps = {
  setNewAttribute,
  removeItem,
};

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.selectAttribute = this.selectAttribute.bind(this);
    this.state = {
      attributes: {},
    };
  }

  selectAttribute(attributeName, attributId) {
    const { selectedAttributes, product } = this.props.data;
    if (selectedAttributes[attributeName] !== attributId) {
      const newAttribute = {
        productId: product.id,
        attributeName,
        attributId,
      };
      this.props.setNewAttribute(newAttribute);
    }
  }

  render() {
    const {
      data: { product, selectedAttributes, quantity },
      miniSize,
      removeItem,
    } = this.props;

    return (
      <div className={miniSize ? "menu-item-wrapper" : "cart-item"}>
        {product && (
          <>
            <div className={`left ${miniSize ? "menu-item" : ""}`}>
              <h3>{product.name}</h3>
              <h4>{product.brand}</h4>
              <div className="price">
                <Price prices={product.prices} />
              </div>
              <Attributes
                product={product}
                selectedAttributes={selectedAttributes}
                miniSize={miniSize}
              />
            </div>
            <div className={miniSize ? "right-menu-item" : "right"}>
              <div className="op-wrapper">
                <ItemQuantity
                  productId={product.id}
                  quantity={quantity}
                  menu={miniSize}
                />
                {miniSize ? (
                  <div className="cart-item-img">
                    <img src={product.gallery[0]} alt="cart-item" />
                  </div>
                ) : (
                  <ItemSlider gallery={product.gallery} />
                )}
              </div>
              <div
                className="trash-icon"
                onClick={() => removeItem(product.id)}
              >
                <img src={trash} alt={trash} />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
