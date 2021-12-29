import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Price from "./Price";
import cart from "../icons/cart.png";

// const mapDispatchToProps = {
//   addItem,
// };

class ProductCard extends Component {
  render() {
    const path = this.props.match?.path;
    const { data } = this.props;
    console.log(data);
    return (
      <div className="product-box">
        <div className="product-image">
          <Link to={`${path}/${data.id}`}>
            <img
              //   jacket img url is invalid ,so I added other one
              src={
                data.id !== "jacket-canada-goosee"
                  ? data.gallery
                  : "https://media.dior.com/couture/ecommerce/media/catalog/product/7/g/1570207502_943C449A4462_C989_E01_ZHC.jpg"
              }
              alt={data.gallery}
            />
          </Link>
          {!data.inStock && <span className="out-stock">OUT OF STOCK</span>}
        </div>
        {data.inStock && (
          <div className="add-to-cart">
            <img src={cart} alt="cart" />
          </div>
        )}

        <h3>{data.name}</h3>
        <Price prices={data.prices} />
      </div>
    );
  }
}
export default withRouter(ProductCard);
