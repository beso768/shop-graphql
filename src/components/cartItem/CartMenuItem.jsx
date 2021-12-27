import React, { Component } from "react";
import "./Cart.css";
import { connect } from "react-redux";
import { setNewAttribute } from "../../state/reducers/CartSlice";
import ItemSlider from "./ItemSlider";
import ItemQuantity from "./ItemQuantity";

const mapStateToProps = (state) => {
  return {
    activeCurrency: state.CurrencyReducer.activeCurrency,
  };
};
const mapDispatchToProps = {
  setNewAttribute,
};

class CartMenuItem extends Component {
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
    const { product, selectedAttributes, quantity } = this.props.data;

    const price = product.prices?.find(
      (price) => price.currency.label === this.props.activeCurrency.label
    );
    return (
      <div className="menu-item-wrapper">
        {product && (
          <>
            <div className="left menu-item">
              <h3>{product.name}</h3>
              <h4>{product.brand}</h4>
              <div className="attribute">
                {price && (
                  <div className="display-price">
                    {price.currency.symbol} {price.amount}
                  </div>
                )}
              </div>
              {product.attributes.map((attribute) => (
                <div className="attribute" key={attribute.id}>
                  <h5>{attribute.id}</h5>
                  {attribute.type === "swatch" ? (
                    <div className="d-flex">
                      {attribute.items.map((item) => (
                        <div
                          style={{
                            filter:
                              selectedAttributes[attribute.name] === item.id
                                ? "drop-shadow(black 0px 0px 0px)"
                                : "none",
                          }}
                          className="colors-wrapper"
                          key={item.id}
                          onClick={() =>
                            this.selectAttribute(attribute.id, item.id)
                          }
                        >
                          <div>{item.displayValue}</div>
                          <div
                            style={{
                              background: item.value,
                            }}
                            className="display-value colored-box menu"
                          ></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="d-flex">
                      {attribute.items.map((item) => (
                        <div
                          style={
                            selectedAttributes[attribute.name] === item.id
                              ? {
                                  backgroundColor: "black",
                                  color: "white",
                                }
                              : {
                                  backgroundColor: "white",
                                  color: "black",
                                }
                          }
                          className="display-value menu"
                          key={item.id}
                          onClick={() =>
                            this.selectAttribute(attribute.id, item.id)
                          }
                        >
                          <span>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
