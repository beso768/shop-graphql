import React, { Component } from "react";
import { addItemToCart } from "../state/reducers/CartSlice";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    activeCurrency: state.CurrencyReducer.activeCurrency,
    cart: state.CartReducer,
  };
};
const mapDispatchToProps = {
  addItemToCart,
};

class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      attributes: {},
      validationErrors: null,
    };
  }

  addToCart() {
    const { attributes } = this.props.product;
    const stateAttributes = Object.keys(this.state.attributes);

    const errors = [];
    attributes.forEach((attribute) => {
      const result = stateAttributes.find(
        (stateAttribute) => stateAttribute === attribute.id
      );
      if (!result) {
        errors.push(attribute.id);
      }
    });
    if (errors.length > 0) {
      this.setState({ validationErrors: errors });
    } else {
      this.setState({ validationErrors: null });
    }

    // this.props.addItemToCart("asdasda");
  }

  selectAttribute(attribute) {
    const oldAttributes = { ...this.state.attributes };
    this.setState({ attributes: { ...oldAttributes, ...attribute } });
  }

  render() {
    const { product } = this.props;
    const { attributes } = product;
    const { prices } = product;
    const price = prices?.find(
      (price) => price.currency.label === this.props.activeCurrency.label
    );
    console.log(this.state);
    return (
      <>
        {Object.keys(product).length !== 0 && (
          <div className="description">
            <h2>{product.brand}</h2>
            <h3>{product.name}</h3>

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
                              this.selectAttribute({ [attribute.id]: item })
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
                              this.selectAttribute({ [attribute.id]: item })
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
                  {price && (
                    <div className="display-price">
                      {price.currency.symbol} {price.amount}
                    </div>
                  )}
                </div>
              </div>
            )}

            <button onClick={this.addToCart} className="add-button">
              ADD TO CART
            </button>
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
