import React, { Component } from "react";
import { connect } from "react-redux";
import AddFollow from "../../create-new";
import { followAction } from "../../../../store/action.store";
import { typeFollowPage } from "../../../../constants/constant";
import ShowFollowInfo from "../../show-follow-info";

class RightFollowingPage extends Component {
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
      payload: { type: this.type || typeFollowPage.FOLLOWING },
    });
  }

  removeFollow(id) {
    this.dispatch({ type: followAction.REMOVE_FOLLOW, id });
    setTimeout(() => {
      this.fetchListFollow();
    }, 100);
  }

  render() {
    const { followList = [] } = this.props;

    return (
      <>
        <AddFollow />
        <ShowFollowInfo
          followList={followList}
          type={typeFollowPage.FOLLOWING}
          onAction={(id) => this.removeFollow(id)}
        />
      </>
    );
  }
}

export default connect((state) => {
  return {
    followList: state.FollowReducer.followList,
    totalFollow: state.FollowReducer.totalFollow,
  };
})(RightFollowingPage);
