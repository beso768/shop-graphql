import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
export default class Message extends Component {
  render() {
    const { validationErrors, success } = this.props;
    return (
      <div className="message">
        {validationErrors && (
          <div className="errors">
            Please choose field(s) :{" "}
            {validationErrors.map((field, ind) => (
              <strong key={uuidv4()}>
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
