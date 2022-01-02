import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../../state/reducers/CartSlice";
import "./Products.css";
import cart from "../../icons/cart.png";
import Attributes from "./Attributes";
import Message from "./Message";
import Price from "./../Price";

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
      success: false,
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
    this.setState({ attributes: {} });
    this.setState({ success: true }, () => {
      setTimeout(() => {
        this.setState({ success: false });
      }, 3000);
    });
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
    const { product, miniSize } = this.props;
    const { attributes } = this.props?.product;
    const { validationErrors, success } = this.state;
    return (
      <>
        {Object.keys(product).length !== 0 && (
          <div className="description">
            <h3>{product.name}</h3>
            {!miniSize && <h4>{product.name}</h4>}
            <div className={`price ${miniSize ? "menu" : ""}`}>
              {!miniSize && <h4>PRICE</h4>}
              <Price prices={product.prices} />
            </div>
            {product.inStock ? (
              <>
                <Attributes
                  product={product}
                  attributes={attributes}
                  selectAttribute={this.selectAttribute}
                  selectedAttributes={this.state.attributes}
                  miniSize={miniSize}
                />
                <button
                  onClick={this.addToCart}
                  className={miniSize ? "add-to-cart" : "add-button"}
                  disabled={this.state.validationErrors}
                  style={
                    this.state.validationErrors && {
                      backgroundColor: "#9effb7",
                    }
                  }
                >
                  {miniSize ? (
                    <img src={cart} alt="cart" />
                  ) : (
                    <span>ADD TO CART</span>
                  )}
                </button>
              </>
            ) : (
              <>{!miniSize && <h1>Out of stock</h1>}</>
            )}
            <Message validationErrors={validationErrors} success={success} />
            {!miniSize && (
              <div className="description-text">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);
