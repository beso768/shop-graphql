import React, { Component } from "react";

export default class Message extends Component {
  render() {
    const { validationErrors, success } = this.props;
    return (
      <div className="message">
        {validationErrors && (
          <div className="errors">
            Please choose field(s) :{" "}
            {validationErrors.map((field, ind) => (
              <strong>
                {field}{" "}
                {ind === validationErrors.length - 1 ? <> . </> : <> , </>}
              </strong>
            ))}
          </div>
        )}
        {success && (
          <strong className="success">Product added successfuly!</strong>
        )}
      </div>
    );
  }
}
