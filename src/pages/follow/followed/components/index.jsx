import React, { Component } from "react";
import { connect } from "react-redux";
import { followAction } from "../../../../store/action.store";
import { typeFollowPage } from "../../../../constants/constant";
import ShowFollowInfo from "../../show-follow-info";

class RightFollowPage extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
    this.type = this.props.type;
  }

  componentDidMount() {
    this.fetchListFollow();
  }

  fetchListFollow() {
    this.dispatch({
      type: followAction.GET_LIST_FOLLOW,
      payload: { type: this.type || typeFollowPage.FOLLOWED },
    });
  }

  followUser(id) {
    this.dispatch({
      type: followAction.ADD_FOLLOW,
      payload: { userFollowedId: id },
    });
    setTimeout(() => {
      this.fetchListFollow();
    }, 100);
  }

  render() {
    const { followList = [] } = this.props;

    return (
      <ShowFollowInfo
        followList={followList}
        type={typeFollowPage.FOLLOWED}
        onAction={(id) => this.followUser(id)}
      />
    );
  }
}

export default connect((state) => {
  return {
    followList: state.FollowReducer.followList,
    totalFollow: state.FollowReducer.totalFollow,
  };
})(RightFollowPage);
