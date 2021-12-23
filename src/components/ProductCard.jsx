import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Product extends Component {
  render() {
    const { data } = this.props;
    return (
      <Link to={`/product/${data.id}`} className="product-box">
        <div className="product-image">
          <img
            //   jacket img url is invalid ,so I added other one
            src={
              data.id !== "jacket-canada-goosee"
                ? data.gallery
                : "https://media.dior.com/couture/ecommerce/media/catalog/product/7/g/1570207502_943C449A4462_C989_E01_ZHC.jpg"
            }
            alt={data.gallery}
          />
        </div>
        <h3>{data.name}</h3>
        <pre>{data.price}</pre>
        <p>{data.inStock ? "in order" : "out of order"}</p>
      </Link>
    );
  }
}
