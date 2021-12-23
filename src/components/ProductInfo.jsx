import React, { Component } from "react";

export default class ProductInfo extends Component {
  render() {
    const { product } = this.props;
    const { attributes } = product;
    console.log(product);
    return (
      <>
        {Object.keys(product).length !== 0 && (
          <div className="description">
            <h2>{product.brand}</h2>
            <h3>{product.name}</h3>
            <div className="size">
              <h3>{attributes[0].name}</h3>
              {attributes[0].items.map((item) => (
                <div>{item.value}</div>
              ))}
              <div className="price">
                <h3>50$</h3>
              </div>
              <button>Add to Cart</button>
              <div className="description-text">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
