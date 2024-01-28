import React from "react";
import { createPortal } from "react-dom";

export default class ShadowDom extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidUpdate() {
    if (!this.state.shadowRoot) {
      const shadowRoot = this.ref.current.attachShadow({ mode: "open" });
      this.setState({ shadowRoot });
    }
  }

  render() {
    return (
      <div ref={this.ref}>
        {this.state.shadowRoot
          ? createPortal(this.props.children, this.state.shadowRoot)
          : null}
      </div>
    );
  }
}
