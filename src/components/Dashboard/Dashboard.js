import React from "react";
import Button from "../Resuable/Button";
import Table from "../Resuable/Table";
import CreateDictionary from "../Sections/CreateDictionary";
import UpdateDraftDictionary from "../Sections/UpdateDraftDictionary";
import PreviewDicitonary from "../Sections/PreviewDictionary";
import SideNav from "../Layout/SideNav";
import { finalDictionaryCreation } from "../../actions/dictionaryActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push("/");
    }
  }

  handleClick() {
    this.props.finalDictionaryCreation(1);
  }

  render() {
    return (
      <div className="dashboard">
        <SideNav
          sideNavList={[
            { item: "dashboard", icon: "fas fa-tachometer-alt" },
            { item: "about", icon: "fas fa-address-card" },
            { item: "news", icon: "fas fa-newspaper" },
            { item: "career", icon: "fas fa-globe" }
          ]}
        />

        <div class="main">
          <h3>Dicitionary Management</h3>
          <div className="row">
            <div className="col-md-2">
              <a href="#">Home</a>
            </div>
          </div>
          <CreateDictionary />
          <UpdateDraftDictionary />
          <PreviewDicitonary />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: state.dictionary.dictionarySuccess,
  errors: state.errors.errors
});

export default connect(
  mapStateToProps,
  {
    finalDictionaryCreation
  }
)(withRouter(Dashboard));
