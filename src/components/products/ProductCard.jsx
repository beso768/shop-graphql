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
                  : "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png"
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
