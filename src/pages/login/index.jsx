import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { routes } from "../../constants/constant";
import AuthService from "../../services/auth.service";
import { withRouter } from "../../services/with-router.service";
import "./index.css";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { requiredField } from "../../utils/login.util";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();
    let message = "";
    let loading = false;
    this.form.validateAll();
    AuthService.login(this.state.username, this.state.password).then(
      (response) => {
        this.props.router.navigate(routes.HOME);
        loading = true;
      },
      (error) => {
        message =
          error.response?.data?.message || error.message || error.toString();
      }
    );
    this.setState({
      loading,
      message,
    });
  }

  render() {
    return (
      <MDBContainer className="my-5 LoginPage">
        <MDBCard className="border-0">
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="/image/login-page.png"
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <img
                    src="/image/icon-login.jpg"
                    alt="logo-img"
                    className="ImageCardLogoLogin"
                  />
                </div>
                <h5
                  className="fw-normal my-4 pb-3 text-center"
                  style={{ letterSpacing: "1px" }}
                >
                  Đăng nhập vào hệ thống
                </h5>

                <Form
                  onSubmit={(e) => this.handleLogin(e)}
                  ref={(c) => {
                    this.form = c;
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={(e) => this.onChangeUsername(e)}
                      validations={[requiredField]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={(e) => this.onChangePassword(e)}
                      validations={[requiredField]}
                    />
                  </div>

                  <div className="form-group">
                    <button
                      className="btn btn-primary btn-block"
                      disabled={this.state.loading}
                    >
                      {this.state.loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Đăng nhập</span>
                    </button>
                  </div>

                  {this.state.message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {this.state.message}
                      </div>
                    </div>
                  )}
                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  />
                </Form>
                <a className="small text-muted fs-6" href="#!">
                  Quên mật khẩu?
                </a>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    );
  }
}

export default withRouter(Login);
