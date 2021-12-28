import React, { PureComponent } from "react";

export default class ItemSlider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(sign) {
    const length = this.props.gallery.length;
    const { currentImg } = this.state;

    if (sign === "+") {
      if (currentImg !== length - 1) {
        this.setState((prev) => ({
          currentImg: prev.currentImg + 1,
        }));
      } else {
        this.setState({ currentImg: 0 });
      }
    } else {
      if (currentImg !== 0) {
        this.setState((prev) => ({
          currentImg: prev.currentImg - 1,
        }));
      } else {
        this.setState({ currentImg: length - 1 });
      }
    }
  }
  render() {
    const { gallery } = this.props;
    return (
      <div className="cart-slider-wrapper">
        <button
          onClick={() => this.handleClick("-")}
          disabled={gallery.length === 1}
        >
          {"<"}
        </button>
        <img src={gallery[this.state.currentImg]} alt="productimg" />
        <button
          onClick={() => this.handleClick("+")}
          disabled={gallery.length === 1}
        >
          {">"}
        </button>
      </div>
    );
  }
}
