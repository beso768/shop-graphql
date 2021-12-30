import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Products.css";
export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: 0,
    };
  }
  selectImage(num) {
    this.setState({ selectedImage: num });
  }

  render() {
    const { gallery } = this.props.product;
    const { selectedImage } = this.state;

    return (
      <div className="slider">
        <div className="image-collection">
          {gallery?.map((img, i) => (
            <div onClick={() => this.selectImage(i)} key={uuidv4()}>
              <img src={img} alt={this.props.product.name} />
            </div>
          ))}
        </div>
        <div className="dispay-image">
          <img src={gallery?.[selectedImage]} alt={this.props.product.name} />
        </div>
      </div>
    );
  }
}
