import React from "react";
import Modal from "../Resuable/Modal";
import InputBox from "../Resuable/InputBox";
import SelectMenu from "../Resuable/SelectMenu";
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
      validationError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchUserProductDetails(1);
    this.props.fetchColorsRange();
  }
  handleChange(e) {
    let currentTemp = this.props.userProducts.filter((data, index) => {
      if (data.product_name === e.target.value) {
        return true;
      }
      return false;
    })[0];
    const initialData = this.state.useEditData
      ? this.props.currentDictionary
      : this.state.currentProduct;
    currentTemp = currentTemp != undefined ? currentTemp : initialData;
    currentTemp[[e.target.name]] = e.target.value;
    this.setState({
      currentProduct: currentTemp,
      useEditData: false
    });
  }
  handleClick(e) {
    e.preventDefault();
    const data = this.state.currentProduct;
    delete data.id;

    console.log("VALIDATE DATA", data);
    if (
      data.product_name != undefined &&
      data.price != undefined &&
      data.domain != undefined &&
      data.range != undefined
    ) {
      // this.props.handleButtonClick(data);
    } else {
      this.setState({ validationError: true });
    }
  }

  render() {
    let { currentProduct, useEditData } = this.state;
    const { userProducts, colors } = this.props;
    let createSelectMenuList = [];
    let colorList = [];
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

    if (Object.keys(this.props.currentDictionary).length > 0 && useEditData) {
      currentProduct = this.props.currentDictionary;
    }

    console.log("currentDictionary", currentProduct);
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
