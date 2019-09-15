import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../Resuable/Button";
import { withRouter } from "react-router";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {}
    };
    this.logoutUser = this.logoutUser.bind(this);
  }
  componentDidMount() {
    if (localStorage.userDetail) {
      this.setState({
        userDetails: JSON.parse(localStorage.userDetail)
      });
    }
  }

  //Logout function
  logoutUser() {
    //Remove the token from localStorage
    localStorage.removeItem("token");
    this.props.history.push("/");
  }

  render() {
    let user = {};
    const { userDetails } = this.state;
    if (userDetails != undefined) {
      user = userDetails;
    }
    const sideNavList = this.props.sideNavList.map((data, index) => {
      return (
        <li key={"sideNamv" + data.item}>
          <i className={data.icon} />
          <Link to={"/dashboard"}>
            <span>{data.item}</span>
          </Link>
        </li>
      );
    });
    return (
      <div className="sidenav">
        <ul>
          <li className="user-image">
            {user.avatar != undefined ? (
              <img
                src={require(`../../images/${user.avatar}`)}
                alt="userImage"
              />
            ) : (
              ""
            )}
          </li>
          <li className="user-name">{user.username}</li>
          <li>
            {" "}
            <Button
              buttonClass="btn-primary create-dictionary-button logout-button"
              buttonLabel="Logout"
              onClick={this.logoutUser}
              icon={`<i class="fas fa-power-off"></i>`}
            />
          </li>
        </ul>
        <ul className="side-navigation">{sideNavList}</ul>
      </div>
    );
  }
}

SideNav.propTypes = {
  sideNavList: PropTypes.array.isRequired
};

export default withRouter(SideNav);
