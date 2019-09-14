import React from "react";
import Navigation from "../Resuable/Navigation";
import LoginBox from "../Resuable/LoginBox";
import MediaCard from "../Resuable/MediaCard";

class Landing extends React.Component {
  render() {
    return (
      <div className="landing-page">
        <div className="overlay"></div>
        <Navigation
          navList={[
            { name: "Dictionary", link: "/dashboard" },
            { name: "About", link: "/" },
            { name: "Career", link: "/" },
            { name: "News", link: "/" }
          ]}
          liClass={"li-class"}
          modeClass={"light-nav"}
        />
        <div className="landing-qoutes">
          <p className="upper-border"></p>
          <h1 className="first-qoutes">Same Great Service</h1>
          <h1>Much bigger Scale</h1>
        </div>
        <LoginBox />
        <MediaCard
          media={`<i class="far fa-play-circle common-icon-lg"></i>`}
          text={`<p>"Successful ambitious reach! Take a look"</p>`}
          parentCustomCss="landing-page-qoutes-parent"
          mediaCustomCss="landing-page-qoutes-media"
          textCustomCss="landing-page-qoutes-text"
        />
      </div>
    );
  }
}

export default Landing;
