import React from "react";
import PropTypes from "prop-types";

class Button extends React.Component {
  render() {
    return (
      <a
        href="##"
        className={`btn ${this.props.buttonClass}`}
        onClick={this.props.onClick}
        data-toggle={this.props.dataToggle}
        data-target={this.props.dataTarget}
        data-dismiss={this.props.dataDismiss}
        id={this.props.id}
      >
        {this.props.buttonLabel}
        <span
          className="btn-icon"
          dangerouslySetInnerHTML={{ __html: this.props.icon }}
        ></span>
      </a>
    );
  }
}

Button.propTypes = {
  buttonClass: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired
};

export default Button;
