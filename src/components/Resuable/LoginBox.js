import React, { Component } from "react";
import Button from "../Resuable/Button";
import InputBox from "../Resuable/InputBox";
import { connect } from "react-redux";
import { login } from "../../actions/authAction";
import { withRouter } from "react-router";

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: "",
      isInvalid: false
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  componentDidCatch(error, errorInfo) {
    console.log("ERRR_LOGIN_BOX", error);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth != undefined) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
      if (!nextProps.auth.isAuthenticated) {
        this.setState({ errors: nextProps.auth.message, isInvalid: true });
      }
    }
  }
  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOnClick(e) {
    if (this.state.email != "" && this.state.password != "") {
      const data = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.login(data);
    } else {
      this.setState({ errors: "Fields can't be blank", isInvalid: true });
    }
  }

  render() {
    return (
      <div className="signup-box">
        <div className="signup-box-child">
          <span>
            <h4>
              <span className="singup-box-active">SignIn</span>
            </h4>
          </span>
        </div>
        <div className="signup-box-child">
          <InputBox
            type="email"
            placeholder="Enter your email"
            handleChange={this.handleOnChange}
            customInputBoxClass={"child-contanier-modal"}
            name="email"
            id="email"
          />
          <InputBox
            type="password"
            placeholder="Enter your password"
            handleChange={this.handleOnChange}
            customInputBoxClass={"child-contanier-modal"}
            name="password"
            id="password"
          />
        </div>
        {this.state.isInvalid ? (
          <div className="validation-error">{this.state.errors}</div>
        ) : (
          ""
        )}
        <div className="signup-box-child button-singup">
          <Button
            buttonClass="btn-primary create-dictionary-button float-none"
            buttonLabel="Login"
            onClick={this.handleOnClick}
            icon={`<i class="fas fa-sign-in-alt"></i>`}
          />
        </div>
      </div>
    );
  }
}
const mapPropsToState = state => ({
  auth: state.auth.authentication
});
export default connect(
  mapPropsToState,
  { login }
)(withRouter(LoginBox));
