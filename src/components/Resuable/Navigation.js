import React from "react";
import Button from "../Resuable/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Navigation extends React.Component {
  render() {
    const listItem = this.props.navList.map((data, index) => {
      return (
        <li key={"navlist" + index} className={this.props.liClass}>
          <Link to={data.link}>{data.name}</Link>
        </li>
      );
    });
    return (
      <nav className={` ${this.props.modeClass} navbar`}>
        <div className="nav-child">
          <h1>
            <Link to={"/"}>DictionaryMS</Link>
          </h1>
        </div>
        <div className="nav-child">
          <ul>{listItem}</ul>
        </div>
        <div className="nav-child">
          <Button
            buttonClass="btn-primary create-dictionary-button float-none"
            buttonLabel="Join Us"
            icon={`<i class="fas fa-handshake"></i>`}
          />
        </div>
      </nav>
    );
  }
}
Navigation.propTypes = {
  navList: PropTypes.array.isRequired
};
export default Navigation;
