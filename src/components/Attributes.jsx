import React, { Component } from "react";
import Price from "./Price";

export default class Attributes extends Component {
  render() {
    const {
      product,
      attributes,
      selectAttribute,
      selectedAttributes,
      miniSize,
    } = this.props;
    return (
      <>
        <div className={`attribute ${miniSize && "menu"}`}>
          <h4>PRICE</h4>
          <Price prices={product.prices} />
        </div>
        {attributes.length > 0 && (
          <div className="attributes">
            {attributes.map((attribute) => (
              <div
                className={`attribute ${miniSize && "menu"}`}
                key={attribute.id}
              >
                <h4>{attribute.name}</h4>

                {attribute.type === "swatch" ? (
                  <div className="d-flex">
                    {attribute.items.map((item) => (
                      <div
                        className="colors-wrapper"
                        key={item.id}
                        onClick={() => selectAttribute(attribute.id, item.id)}
                        style={{
                          filter:
                            selectedAttributes[attribute.name] === item.id
                              ? "drop-shadow(black 0px 0px 0px)"
                              : "none",
                        }}
                      >
                        <div>{item.displayValue}</div>
                        <div
                          style={{
                            background: item.value,
                          }}
                          className={`display-value colored-box ${
                            miniSize && "menu"
                          }`}
                        ></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="d-flex">
                    {attribute.items.map((item) => (
                      <div
                        className={`display-value ${miniSize && "menu"}`}
                        key={item.id}
                        onClick={() => selectAttribute(attribute.id, item.id)}
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
                      >
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
}
