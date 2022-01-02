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
                      className={`display-value ${miniSize ? "menu" : ""}`}
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
      </>
    );
  }
}
export default connect(null, mapDispatchToProps)(Attributes);
