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
    this.setState({ attributes: {} });
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
    const { validationErrors } = this.state;
    return (
      <>
        {Object.keys(product).length !== 0 && (
          <div className="description">
            <h3>{product.brand}</h3>
            <h4>{product.name}</h4>

            {product.inStock ? (
              <>
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
            {this.state.validationErrors && (
              <div className="errors">
                Please choose{" "}
                {validationErrors.map((field, ind) =>
                  ind === validationErrors.length - 1 ? (
                    <strong>{field}.</strong>
                  ) : (
                    <strong>{field} and </strong>
                  )
                )}
              </div>
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
