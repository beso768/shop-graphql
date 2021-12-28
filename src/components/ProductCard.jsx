import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Price from "./Price";

class ProductCard extends Component {
  render() {
    const path = this.props.match?.path;
    const { data } = this.props;

    return (
      <Link to={`${path}/${data.id}`} className="product-box">
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
          {!data.inStock && <span className="out-stock">OUT OF STOCK</span>}
        </div>
        <h3>{data.name}</h3>
        <Price prices={data.prices} />
      </Link>
    );
  }
}
export default withRouter(ProductCard);
