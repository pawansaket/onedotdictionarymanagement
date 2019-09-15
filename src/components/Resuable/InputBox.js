import React from "react";
import PropTypes from "prop-types";

class InputBox extends React.Component {
  render() {
    return (
      <div className={`input-box-bottom ${this.props.customInputBoxClass}`}>
        <input
          type={this.props.type}
          className={`form-control `}
          id={this.props.id}
          placeholder={this.props.placeholder}
          onChange={this.props.handleChange}
          name={this.props.name}
          value={this.props.value}
          disabled={this.props.disabledMode}
        />
      </div>
    );
  }
}

InputBox.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default InputBox;
