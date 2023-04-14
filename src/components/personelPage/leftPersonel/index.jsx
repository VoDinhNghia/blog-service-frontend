import React, { Component } from "react";
import "./index.css";
import InfoUserPanel from "../../commons/InfoUserPanel/index";
import { connect } from "react-redux";
import { userAction } from "../../../store/action";
import AuthService from "../../../services/authService";

class LeftPersonel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    const { dispatch, userId } = this.props;
    dispatch({ type: userAction.GET_USER_BY_ID, payload: { userId } });
  }

  render() {
    const { userInfo = {} } = this.props;
    const currentUser = AuthService.getCurrentUser();

    return (
      <>
        <div className="LeftMenuPersonel">
          <InfoUserPanel data={userInfo} />
          {currentUser?.id === userInfo?.id ? (
            <p>button share post, list image, follow ,...</p>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.UserReducer.userInfo,
  };
}
export default connect(mapStateToProps)(LeftPersonel);
