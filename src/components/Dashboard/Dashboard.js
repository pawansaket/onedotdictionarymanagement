import React from "react";
import CreateDictionary from "../Sections/CreateDictionary";
import UpdateDraftDictionary from "../Sections/UpdateDraftDictionary";
import PreviewDicitonary from "../Sections/PreviewDictionary";
import Footer from "../Layout/Footer";
import SideNav from "../Layout/SideNav";
import { withRouter } from "react-router";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push("/");
    }
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
          <h3 className="dm-title">Dicitionary Management</h3>
          <div className="row">
            <div className="col-md-2">
              <a className="dm-title" href="#">
                Home
              </a>
            </div>
          </div>
          <CreateDictionary />
          <UpdateDraftDictionary />
          <PreviewDicitonary />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Dashboard);
