import React, { Component } from "react";
import PropTypes from "prop-types";

class MediaCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={`media-card-parent ${this.props.parentCustomCss}`}>
        <div
          className={`media-box ${this.props.mediaCustomCss}`}
          dangerouslySetInnerHTML={{ __html: this.props.media }}
        ></div>
        <div
          className={`text-box ${this.props.textCustomCss}`}
          dangerouslySetInnerHTML={{ __html: this.props.text }}
        ></div>
      </div>
    );
  }
}

MediaCard.propTypes = {
  media: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default MediaCard;
