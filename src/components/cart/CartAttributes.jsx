import React, { Component } from "react";
import { connect } from "react-redux";
import { setNewAttribute } from "../../state/reducers/CartSlice";

const mapDispatchToProps = {
  setNewAttribute,
};

class Attributes extends Component {
  selectAttribute(attributeName, attributId) {
    const { selectedAttributes, product } = this.props;
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
    const { product, selectedAttributes, miniSize } = this.props;
    return (
      <>
        {product &&
          product.attributes.map((attribute) => (
            <div className="attribute" key={attribute.id}>
              <h5>{attribute.id}</h5>
              {attribute.type === "swatch" ? (
                <div className="d-flex">
                  {attribute.items.map((item) => (
                    <div
                      className={`colors-wrapper ${
                        selectedAttributes[attribute.name] === item.id
                          ? "active"
                          : ""
                      }`}
                      key={item.id}
                      onClick={
                        !miniSize
                          ? () => this.selectAttribute(attribute.id, item.id)
                          : null
                      }
                    >
                      <div>{item.displayValue}</div>
                      <div
                        style={{
                          background: item.value,
                        }}
                        className={`display-value colored-box ${
                          miniSize ? "menu" : ""
                        }`}
                      ></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex">
                  {attribute.items.map((item) => (
                    <div
                      className={`display-value ${miniSize ? "menu" : ""} ${
                        selectedAttributes[attribute.name] === item.id
                          ? "active"
                          : ""
                      }`}
                      key={item.id}
                      onClick={
                        !miniSize
                          ? () => this.selectAttribute(attribute.id, item.id)
                          : null
                      }
                    >
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </>
    );
  }
}
export default connect(null, mapDispatchToProps)(Attributes);
