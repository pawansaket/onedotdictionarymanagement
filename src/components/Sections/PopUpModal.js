import React from "react";
import Modal from "../Resuable/Modal";
import InputBox from "../Resuable/InputBox";
import SelectMenu from "../Resuable/SelectMenu";
import PropTypes from "prop-types";
import {
  fetchUserProductDetails,
  fetchColorsRange
} from "../../actions/dictionaryActions";
import { connect } from "react-redux";

class PopUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      useEditData: true,
      validationError: false,
      disabledMode: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (localStorage.userDetail) {
      const user = JSON.parse(localStorage.userDetail);
      this.props.fetchUserProductDetails(user.id);
    }
    this.props.fetchColorsRange();
  }

  //Hanlde the changes to the fields
  handleChange(e) {
    //check current product selected
    let currentTemp = this.props.userProducts.filter((data, index) => {
      if (data.product_name === e.target.value) {
        return true;
      }
      return false;
    })[0];

    //initialize the current product to get its value from edit and create mode
    const initialData = this.state.useEditData
      ? this.props.currentDictionary
      : this.state.currentProduct;
    currentTemp = currentTemp != undefined ? currentTemp : initialData;
    currentTemp[[e.target.name]] = e.target.value;

    this.setState({
      currentProduct: currentTemp,
      useEditData: false,
      disabledMode: false,
      validationError: false
    });
  }
  //Clicking to create or edit dictionary
  handleClick(e) {
    e.preventDefault();
    //Using json parse to prevent from reference copying error
    const sendData = JSON.parse(JSON.stringify(this.state.currentProduct));
    if (this.props.identity === "createDictionary") {
      delete sendData.id;
    }

    if (
      sendData.product_name != undefined &&
      sendData.price != undefined &&
      sendData.domain != undefined &&
      sendData.range != undefined
    ) {
      this.props.handleButtonClick(sendData);
    } else {
      this.setState({ validationError: true });
    }
  }

  render() {
    let { currentProduct, useEditData, disabledMode } = this.state;
    const { userProducts, colors } = this.props;
    let createSelectMenuList = [];
    let colorList = [];
    let disableProductSelection = false;

    //Creating product menu list
    if (userProducts != undefined) {
      for (let i = 0; i < userProducts.length; i++) {
        createSelectMenuList.push(userProducts[i].product_name);
      }
    }
    if (colors != undefined) {
      colorList = colors;
    }

    //Assigning default value
    if (Object.keys(currentProduct).length < 1) {
      currentProduct = {
        price: "",
        product_name: "Select Product",
        domain: "Select Domain",
        range: "Select Range"
      };
    }

    //This checks the details for the edit mode setting
    if (Object.keys(this.props.currentDictionary).length > 0 && useEditData) {
      currentProduct = this.props.currentDictionary;
    }

    //chekch if edit mode
    if (this.props.identity === "editDictionary") {
      disabledMode = false;
      disableProductSelection = true;
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <form id="dictionarForm">
            <Modal
              title={this.props.modalTitle}
              handleClick={this.handleClick}
              id={this.props.id}
              buttonName={this.props.buttonName}
              validationError={this.state.validationError}
            >
              <div className="row">
                <div className="col-md-12 parent-contanier-modal">
                  <label className="child-contanier-modal">
                    Select a Product:
                  </label>
                  <SelectMenu
                    itemList={createSelectMenuList}
                    handleChange={this.handleChange}
                    name="product_name"
                    selectMenuCustomClass={"child-contanier-modal"}
                    value={currentProduct.product_name}
                    disabledMode={disableProductSelection}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 parent-contanier-modal">
                  <label className="child-contanier-modal">Price:</label>
                  <InputBox
                    type="text"
                    placeholder="Price"
                    value={currentProduct.price}
                    handleChange={this.handleChange}
                    customInputBoxClass={"child-contanier-modal"}
                    name="price"
                    disabledMode={disabledMode}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 parent-contanier-modal">
                  <label className="child-contanier-modal">
                    Select Domain Color:
                  </label>
                  <SelectMenu
                    itemList={colorList}
                    handleChange={this.handleChange}
                    name="domain"
                    selectMenuCustomClass={"child-contanier-modal"}
                    value={currentProduct.domain}
                    disabledMode={disabledMode}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 parent-contanier-modal">
                  <label className="child-contanier-modal">
                    Select Range Color:
                  </label>
                  <SelectMenu
                    itemList={colorList}
                    handleChange={this.handleChange}
                    name="range"
                    selectMenuCustomClass={"child-contanier-modal"}
                    value={currentProduct.range}
                    disabledMode={disabledMode}
                  />
                </div>
              </div>
            </Modal>
          </form>
        </div>
      </div>
    );
  }
}

PopUpModal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  identity: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fetchUserProductDetails: PropTypes.func.isRequired,
  fetchColorsRange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userProducts: state.dictionary.userProducts,
  colors: state.dictionary.colors
});

export default connect(
  mapStateToProps,
  {
    fetchUserProductDetails,
    fetchColorsRange
  }
)(PopUpModal);
