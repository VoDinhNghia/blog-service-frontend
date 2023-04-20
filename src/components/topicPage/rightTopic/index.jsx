import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import { studySpaceAction } from "../../../store/action";
import moment from "moment/moment";
import { formatDateTime, routes } from "../../../common/constant";
import { Button } from "react-bootstrap";
import ActionTopicDetail from "./actions";
import { Link } from "react-router-dom";
import { BsFillPlusSquareFill } from "react-icons/bs";
import AuthService from "../../../services/authService";
import AddNewProblemModal from "./newProblem";
import ProblemList from "./problem";

class RightTopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalAddProblem: false,
    };
  }

  componentDidMount() {
    this.fetchTopicInfo();
  }

  fetchTopicInfo() {
    const { dispatch, topicId } = this.props;
    dispatch({ type: studySpaceAction.GET_TOPIC_BY_ID, id: topicId });
  }

  showModalAddProblem() {
    this.setState({
      isShowModalAddProblem: true,
    });
  }

  closeModalAddProblem() {
    this.setState({
      isShowModalAddProblem: false,
    });
  }

  render() {
    const { topicInfo = {} } = this.props;
    const { isShowModalAddProblem } = this.state;
    const currentUser = AuthService.getCurrentUser();

    return (
      <>
        <div className="TopicDetailPage">
          <div className="TitleTopicInfo">
            <h4>
              {topicInfo?.name}{" "}
              <span className="ActionTopic">
                {currentUser?.id === topicInfo?.createdBy?.id ? (
                  <ActionTopicDetail topicInfo={topicInfo} />
                ) : null}
              </span>
            </h4>
          </div>
          <div className="ContentTopicInfo">
            <p>
              <b>Created by</b>:{" "}
              <Link
                to={routes.PERSONEL}
                state={{ userId: topicInfo?.createdBy?.id }}
              >
                {`${topicInfo?.createdBy?.lastName || ""} ${
                  topicInfo?.createdBy?.middleName || ""
                } ${topicInfo?.createdBy?.firstName || ""}`}
              </Link>
            </p>
            <p>
              <b>CreateAt</b>:{" "}
              {moment(topicInfo?.createdAt).format(formatDateTime)}
            </p>
            <p>
              <b>Description</b>: {topicInfo?.description}
            </p>
          </div>
        </div>
        <hr />
        <div className="BtnAddProblem">
          <Button
            variant="outline-primary"
            onClick={() => this.showModalAddProblem()}
          >
            <BsFillPlusSquareFill /> Add new problem
          </Button>
          <AddNewProblemModal
            isShowModalAddProblem={isShowModalAddProblem}
            closeModalAddProblem={() => this.closeModalAddProblem()}
            topicId={topicInfo?.id}
          />
        </div>
        <div>
          <ProblemList problemList={topicInfo?.studyProblems} topicId={topicInfo?.id} />
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
