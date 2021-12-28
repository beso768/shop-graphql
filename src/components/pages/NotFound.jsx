import React, { Component } from "react";
import { withRouter } from "react-router";

class NotFound extends Component {
  render() {
    const { params } = this.props.match;
    const { id } = params;
    const path = params[0]?.slice(1);
    return (
      <div>
        <h1>
          No results for <strong>{id || path}</strong>
        </h1>
      </div>
    );
  }
}

export default withRouter(NotFound);
