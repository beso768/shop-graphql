import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import ProductInfo from "./ProductInfo";
import "./Products.css";
class ProductCard extends Component {
  render() {
    const path = this.props.match?.path;
    const { product } = this.props;
    return (
      <div className="product-box">
        <div className="product-image">
          <Link to={`${path}/${product.id}`}>
            <img
              //   jacket img url is invalid ,so I added other one
              src={
                product.id !== "jacket-canada-goosee"
                  ? product.gallery
                  : "https://media.dior.com/couture/ecommerce/media/catalog/product/7/g/1570207502_943C449A4462_C989_E01_ZHC.jpg"
              }
              alt={product.gallery}
            />
          </Link>
          {!product.inStock && <span className="out-stock">OUT OF STOCK</span>}
        </div>
        <ProductInfo product={product} miniSize={true} />
      </div>
    );
  }
}
export default withRouter(ProductCard);
