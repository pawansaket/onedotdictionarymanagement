import React from "react";
import Button from "../Resuable/Button";
import PopUpModal from "./PopUpModal";
import { createOrUpdateDictionary } from "../../actions/dictionaryActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import $ from "jquery";

class CreateDictionary extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleButtonClick(data) {
    data["userMode"] = "create";
    this.props.createOrUpdateDictionary(data);
  }
  handleClick(e) {
    $("#dictionarForm").trigger("reset");
    $("#createDictionary").modal("show");
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <PopUpModal
            modalTitle="Create Dictionary"
            handleButtonClick={this.handleButtonClick}
            identity="createDictionary"
            id="createDictionary"
            currentDictionary={{}}
            buttonName="Create"
          />
          <Button
            buttonClass="btn-primary create-dictionary-button"
            buttonLabel="Create Dictionary"
            onClick={this.handleClick}
            id="createDictionary"
            icon={`<i class="fas fa-plus-circle"></i>`}
          />
        </div>
      </div>
    );
  }
}

CreateDictionary.propTypes = {
  createOrUpdateDictionary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    createOrUpdateDictionary
  }
)(CreateDictionary);
