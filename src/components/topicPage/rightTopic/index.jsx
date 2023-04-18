import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import { studySpaceAction } from "../../../store/action";
import moment from "moment/moment";
import { formatDateTime } from "../../../common/constant";

class RightTopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchTopicInfo();
  }

  fetchTopicInfo() {
    const { dispatch, topicId } = this.props;
    dispatch({ type: studySpaceAction.GET_TOPIC_BY_ID, id: topicId });
  }

  render() {
    const { topicInfo = {} } = this.props;
    return (
      <>
        <div className="TopicDetailPage">
          <span><h4>Topic Infomation <p className="ActionTopic">action (update, delete, add new problem)</p></h4></span>
          <p>
            <b>Name</b>: {topicInfo?.name}
          </p>
          <p>
            <b>Created by</b>:{" "}
            {`${topicInfo?.createdBy?.lastName || ""} ${
              topicInfo?.createdBy?.middleName || ""
            } ${topicInfo?.createdBy?.firstName || ""}`}
          </p>
          <p>
            <b>CreateAt</b>:{" "}
            {moment(topicInfo?.createdAt).format(formatDateTime)}
          </p>
          <p>
            <b>Description</b>: {topicInfo?.description}
          </p>
        </div>
        <div>
            List problems
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    topicInfo: state.StudySpaceReducer.topicInfo,
  };
}
export default connect(mapStateToProps)(RightTopicPage);
