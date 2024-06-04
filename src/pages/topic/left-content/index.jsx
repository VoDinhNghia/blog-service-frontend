import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import InfoUserPanel from "../../commons/InfoUserPanel";
import AuthService from "../../../services/authService";
import { userAction } from "../../../store/action";

class LeftTopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dispatch = this.props.dispatch;
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    const currentUser = AuthService.getCurrentUser();
    this.dispatch({
      type: userAction.GET_USER_BY_ID,
      payload: { userId: currentUser?.id },
    });
  }

  render() {
    const { userInfo } = this.props;
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
})(LeftTopicPage);
