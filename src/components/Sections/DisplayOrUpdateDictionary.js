import React from "react";
import Table from "../Resuable/Table";
import { connect } from "react-redux";
import {
  fetchDraftDictionaryList,
  createOrUpdateDictionary,
  deleteDraftDictionaryList
} from "../../actions/dictionaryActions";
import PopUpModal from "./PopUpModal";
import PropTypes from "prop-types";
import $ from "jquery";

class DisplayOrUpdateDictionary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDictionary: ""
    };
    this.handleClickModalPop = this.handleClickModalPop.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleClickDictionaryDelete = this.handleClickDictionaryDelete.bind(
      this
    );
    this.creatTableData = this.creatTableData.bind(this);
  }

  //Handle modal button click to update dictionary on edit mode
  handleButtonClick(data) {
    data["userMode"] = "edit";
    this.props.createOrUpdateDictionary(data);
    $("#editDictionary").modal("hide");
  }

  //Pop up the modal with the current product id passed from table edit button
  handleClickModalPop(id) {
    $("#editDictionary").modal("show");
    const currentData = this.props.draftDictionary.filter((data, index) => {
      if (data.id === id) {
        return true;
      }
      return false;
    });
    this.setState({ currentDictionary: currentData[0] });
  }

  //Delete the dictionary with id supplied from table delete button
  handleClickDictionaryDelete(id) {
    if (localStorage.userDetail) {
      const user = JSON.parse(localStorage.userDetail);

      let data = {
        userId: user.id,
        id: id
      };
      this.props.deleteDraftDictionaryList(data);
    }
  }

  //Fetch the current user dictionary list
  componentDidMount() {
    if (localStorage.userDetail) {
      const user = JSON.parse(localStorage.userDetail);
      this.props.fetchDraftDictionaryList(user.id);
    }
  }

  //Function to create table data with html conent to display on table
  creatTableData(tableData) {
    let afterTable = tableData.slice();
    for (let i = 0; i < afterTable.length; i++) {
      let productName = afterTable[i].product_name;
      afterTable[
        i
      ].product_name = `<div><img class="product_image" src="${require(`../../images/${afterTable[i].image}`)}"/><span class="product_name">${productName}</span></div>`;

      afterTable[i].message =
        afterTable[i].status === "danger"
          ? `<span class="danger">${afterTable[i].message}</span>`
          : afterTable[i].status === "warning"
          ? `<span class="warning">${afterTable[i].message}</span>`
          : `<span class="valid">${afterTable[i].message}</span>`;

      afterTable[i].status =
        afterTable[i].status === "danger"
          ? `<p class="circle-icon circle-danger" title="danger"><i class="fas fa-exclamation-circle status-sign"></i></p>`
          : afterTable[i].status === "warning"
          ? `<p class="circle-icon circle-warning" title="warning"><i class="fas fa-exclamation-triangle status-sign"></i></p>`
          : `<p class="circle-icon circle-valid" title="valid"><i class="fas fa-check-circle status-sign"></i></p>`;
    }
    return afterTable;
  }

  render() {
    const { draftDictionary } = this.props;
    const { currentDictionary } = this.state;
    let tableData = [];
    let currentTempData = {};
    let tableDataKeys = {};

    //Assigning data based on whether data is present or not
    //Then create the table uisng function and delete unwanted keys to be displayed
    if (draftDictionary != undefined) {
      tableData =
        draftDictionary.length > 0
          ? JSON.parse(JSON.stringify(draftDictionary))
          : [{}];
      if (draftDictionary.length > 0) {
        tableData = this.creatTableData(tableData);
      }
      tableDataKeys = Object.assign({}, tableData[0]);
      delete tableDataKeys.userId;
      delete tableDataKeys.id;
      delete tableDataKeys.image;
    }

    //Passing the current dicitonary selected on edit mode
    if (currentDictionary != undefined) {
      currentTempData = currentDictionary;
    }

    return (
      <div className="row">
        <PopUpModal
          modalTitle="Edit Dictionary"
          handleButtonClick={this.handleButtonClick}
          identity="editDictionary"
          id="editDictionary"
          currentDictionary={currentTempData}
          buttonName="Update"
        />
        <div className="col-md-12">
          <h5>Dicitonary Overview</h5>
          <Table
            tableIdentity="dictionaryDetails"
            tableData={tableData}
            handleClickModalPop={this.handleClickModalPop}
            handleClickDictionaryDelete={this.handleClickDictionaryDelete}
            tableHead={Object.keys(tableDataKeys)}
          />
        </div>
      </div>
    );
  }
}

DisplayOrUpdateDictionary.propTypes = {
  fetchDraftDictionaryList: PropTypes.func.isRequired,
  createOrUpdateDictionary: PropTypes.func.isRequired,
  deleteDraftDictionaryList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  draftDictionary: state.dictionary.draftDictionary
});
export default connect(
  mapStateToProps,
  {
    fetchDraftDictionaryList,
    createOrUpdateDictionary,
    deleteDraftDictionaryList
  }
)(DisplayOrUpdateDictionary);
