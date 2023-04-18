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
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    const { dispatch } = this.props;
    const currentUser = AuthService.getCurrentUser();
    dispatch({
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

function mapStateToProps(state) {
  return {
    userInfo: state.UserReducer.userInfo,
  };
}
export default connect(mapStateToProps)(LeftTopicPage);
