import React from "react";
import Table from "../Resuable/Table";
import { connect } from "react-redux";

class PreviewDicitonary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { draftDictionary } = this.props;
    const previewTableDataKeys = ["domain", "range"];
    let previewTableData = [];
    const customerTableDataKeys = ["product_name", "range", "price"];
    let customerTableData = [];

    if (draftDictionary != undefined) {
      if (draftDictionary.length > 0) {
        for (let i = 0; i < draftDictionary.length; i++) {
          if (draftDictionary[i].status !== "danger") {
            previewTableData.push(draftDictionary[i]);
            customerTableData.push(draftDictionary[i]);
          }
        }
      } else {
        previewTableData = [{}];
      }
    }

    return (
      <div className="row mt-top-10">
        <div className="col-md-4">
          <h5>Valid Dicitonary Preview</h5>
          <Table
            tableIdentity="dictionaryPreview"
            tableData={previewTableData}
            tableHead={previewTableDataKeys}
          />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-6">
          <h5>Customer View </h5>
          <Table
            tableIdentity="dictionaryPreview"
            tableData={customerTableData}
            tableHead={customerTableDataKeys}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  draftDictionary: state.dictionary.draftDictionary
});
export default connect(mapStateToProps)(PreviewDicitonary);
