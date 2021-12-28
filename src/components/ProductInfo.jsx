import React, { Component } from "react";
import { addItem } from "../state/reducers/CartSlice";
import { connect } from "react-redux";
import Price from "./Price";

const mapStateToProps = (state) => {
  return {
    activeCurrency: state.CurrencyReducer.activeCurrency,
    cart: state.CartReducer,
  };
};
const mapDispatchToProps = {
  addItem,
};

class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.selectAttribute = this.selectAttribute.bind(this);
    this.state = {
      attributes: {},
      validationErrors: null,
    };
  }

  addToCart() {
    const { product } = this.props;
    const { attributes } = product;
    const stateAttributes = Object.keys(this.state.attributes);

    const errors = [];
    attributes.forEach((attribute) => {
      const attributeResult = stateAttributes.find(
        (stateAttribute) => stateAttribute === attribute.id
      );
      if (!attributeResult) {
        errors.push(attribute.id);
      }
    });
    if (errors.length > 0) {
      this.setState({ validationErrors: errors });
      return;
    }

    const cartItem = {
      productId: product.id,
      product,
      selectedAttributes: this.state.attributes,
    };

    this.props.addItem(cartItem);
  }

  selectAttribute(attrName, attrId) {
    const oldAttributes = { ...this.state.attributes };
    this.setState({ attributes: { ...oldAttributes, [attrName]: attrId } });
    if (this.state.validationErrors?.includes(attrName)) {
      const newValidationErrors = this.state.validationErrors.filter(
        (err) => err !== attrName
      );
      this.setState({
        validationErrors:
          newValidationErrors.length > 0 ? newValidationErrors : null,
      });
    }
  }

  render() {
    const { product } = this.props;
    const { attributes } = this.props?.product;
    return (
      <>
        {Object.keys(product).length !== 0 && (
          <div className="description">
            <h3>{product.brand}</h3>
            <h4>{product.name}</h4>

            {product.inStock ? (
              <>
                {attributes.length > 0 && (
                  <div className="attributes">
                    {attributes.map((attribute) => (
                      <div className="attribute" key={attribute.id}>
                        <h4>{attribute.name}</h4>

                        {attribute.type === "swatch" ? (
                          <div className="d-flex">
                            {attribute.items.map((item) => (
                              <div
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
                                  className="display-value colored-box"
                                ></div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="d-flex">
                            {attribute.items.map((item) => (
                              <div
                                className="display-value"
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
                    <div className="attribute">
                      <h4>PRICE</h4>
                      <Price prices={product.prices} />
                    </div>
                  </div>
                )}

                <button
                  onClick={this.addToCart}
                  className="add-button"
                  disabled={this.state.validationErrors}
                  style={
                    this.state.validationErrors && {
                      backgroundColor: "#9effb7",
                    }
                  }
                >
                  ADD TO CART
                </button>
              </>
            ) : (
              <h1>Out of stock</h1>
            )}
            <div className="description-text">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);
