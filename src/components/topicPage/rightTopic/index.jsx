import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import { studySpaceAction } from "../../../store/action";
import moment from "moment/moment";
import { formatDateTime, routes } from "../../../common/constant";
import { Card, Button } from "react-bootstrap";
import ActionTopicDetail from "./actions";
import { Link } from "react-router-dom";
import { BsFillPlusSquareFill, BsFillTrashFill } from "react-icons/bs";
import { FcViewDetails } from "react-icons/fc";
import AuthService from "../../../services/authService";

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
          <Button variant="outline-primary">
            <BsFillPlusSquareFill /> Add new problem
          </Button>
        </div>
        <div>
          {topicInfo?.studyProblems?.map((problem) => {
            return (
              <Card className="RightTopicPage" key={problem?.id}>
                <Card.Body>
                  <Card.Title>
                    <img
                      src={
                        problem?.createdBy?.avatar || "/image/icon-login.png"
                      }
                      alt=""
                      className="IconUserCreateProblem"
                    />
                    <Link
                      to={routes.PERSONEL}
                      state={{ userId: problem?.createdById }}
                    >{`${problem?.createdBy?.lastName || ""} ${
                      problem?.createdBy?.middleName || ""
                    } ${problem?.createdBy?.firstName || ""}`}</Link>
                    <p className="ShowTimeProblem">
                      {`${moment(problem?.createdAt || "").format(
                        formatDateTime
                      )}`}
                    </p>
                  </Card.Title>
                  <Card.Text>{problem?.problem}</Card.Text>
                  <hr />
                  <div className="BtnProblemCard">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="BtnViewSolution"
                    >
                      <FcViewDetails /> View Solution
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="BtnAddSolution"
                    >
                      <BsFillPlusSquareFill /> Add Solution
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="BtnDeleteProblem"
                    >
                      <BsFillTrashFill /> Delete Problem
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
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
