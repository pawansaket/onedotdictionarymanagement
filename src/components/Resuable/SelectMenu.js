import React from "react";
import PropTypes from "prop-types";

class SelectMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const optionItem = this.props.itemList.map((data, index) => {
      return (
        <option value={data} keys={"options" + index + data}>
          {data}
        </option>
      );
    });
    return (
      <select
        onChange={this.props.handleChange}
        name={this.props.name}
        className={`custom-select custom-select-lg mb-3 ${this.props.selectMenuCustomClass}`}
        disabled={this.props.disabledMode}
      >
        <option value={this.props.value} defaultValue>
          {this.props.value}
        </option>
        {optionItem}
      </select>
    );
  }
}

// SelectMenu.propTypes = {
//   itemList: PropTypes.array.isRequired,
//   handleChange: PropTypes.func.isRequired,
//   name: PropTypes.string.isRequired,
// default:PropTypes.string.isRequired
// };

export default SelectMenu;
