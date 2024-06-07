import React, { Component } from "react";
import { connect } from "react-redux";
import InfoUserPanel from "../../commons/user-info";
import AuthService from "../../../services/auth.service";
import { userAction } from "../../../store/action.store";
import "./index.css";

class LeftStudySpace extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
    this.userId = this.props.userId;
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    const currentUser = AuthService.getCurrentUser();
    this.dispatch({
      type: userAction.GET_USER_BY_ID,
      payload: { userId: this.userId || currentUser?.id },
    });
  }

  render() {
    const { userInfo = {} } = this.props;
    return (
      <div>
        <div className="LeftMenuPersonel">
          <InfoUserPanel data={userInfo} />
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    userInfo: state.UserReducer.userInfo,
  };
})(LeftStudySpace);
