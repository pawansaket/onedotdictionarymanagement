import React from "react";
import PropTypes from "prop-types";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(d) {
    console.log("handle");
  }
  render() {
    const tableHead = this.props.tableHead.map((data, index) => {
      return (
        <th
          scope="col"
          keys={"tablehead" + index + new Date().getMilliseconds()}
        >
          {data
            .split("_")
            .join(" ")
            .toUpperCase()}
        </th>
      );
    });

    const tableData = this.props.tableData.map((data, index) => {
      return (
        <tr keys={"data-table-inner" + index}>
          {this.props.tableHead.map((innerData, innerIndex) => {
            return (
              <td
                keys={"innerdata" + innerIndex + new Date().getMilliseconds()}
                dangerouslySetInnerHTML={{ __html: data[innerData] }}
              ></td>
            );
          })}
          {this.props.tableIdentity === "dictionaryDetails" ? (
            <td
              keys={"createActionColumn" + index}
              className="action-container"
            >
              <a
                href="#"
                onClick={() => {
                  this.props.handleClickModalPop(data.id);
                }}
                className="action-button"
                title="Edit"
              >
                <i className="fas fa-edit action-icon"></i>
              </a>
              <a
                href="#"
                onClick={() => this.props.handleClickDictionaryDelete(data.id)}
                className="action-button"
                title="Delete"
              >
                <i className="fas fa-trash-alt action-icon"></i>
              </a>
            </td>
          ) : (
            ""
          )}
        </tr>
      );
    });

    return (
      <table className="table table-custom">
        <thead>
          <tr>
            {tableHead}
            {this.props.tableIdentity === "dictionaryDetails" ? (
              <th>ACTIONS</th>
            ) : (
              <th></th>
            )}
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    );
  }
}

Table.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableHead: PropTypes.array.isRequired
};

export default Table;
