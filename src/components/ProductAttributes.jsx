import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../state/reducers/CartSlice";
const mapStateToProps = (state) => {
  return {
    activeCurrency: state.CurrencyReducer.activeCurrency,
    cart: state.CartReducer,
  };
};
const mapDispatchToProps = {
  addItem,
};

class ProductAttributes extends Component {
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
  render() {
    return;
    <div></div>;
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductAttributes);
