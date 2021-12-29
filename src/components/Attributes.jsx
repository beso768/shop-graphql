import React, { Component } from "react";

export default class Attributes extends Component {
  render() {
    const attributes = [];
    return (
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
                        style={{
                          filter:
                            this.state.attributes[attribute.name] === item.id
                              ? "drop-shadow(black 0px 0px 0px)"
                              : "none",
                        }}
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
                        style={
                          this.state.attributes[attribute.name] === item.id
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
            <div className="attribute">
              <h4>PRICE</h4>
              <Price prices={product.prices} />
            </div>
          </div>
        )}
      </>
    );
  }
}
