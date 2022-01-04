import React, { Component } from "react";
import "./Products.css";
export default class Attributes extends Component {
  render() {
    const { attributes, selectAttribute, selectedAttributes, miniSize } =
      this.props;
    return (
      <>
        {attributes.length > 0 && (
          <div className={`attributes ${miniSize ? "menu" : ""}`}>
            {attributes.map((attribute) => (
              <div className="attribute" key={attribute.id}>
                <h4>{attribute.name}</h4>

                {attribute.type === "swatch" ? (
                  <div className="d-flex">
                    {attribute.items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => selectAttribute(attribute.id, item.id)}
                        className={`colors-wrapper ${
                          selectedAttributes[attribute.name] === item.id
                            ? "active"
                            : ""
                        }`}
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
                        key={item.id}
                        onClick={() => selectAttribute(attribute.id, item.id)}
                        className={`display-value ${miniSize ? "menu" : ""} ${
                          selectedAttributes[attribute.name] === item.id
                            ? "active"
                            : ""
                        }`}
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
