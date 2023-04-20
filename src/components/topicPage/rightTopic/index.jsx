import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import { studySpaceAction } from "../../../store/action";
import moment from "moment/moment";
import { formatDateTime, routes } from "../../../common/constant";
import { Card, Button, Collapse } from "react-bootstrap";
import ActionTopicDetail from "./actions";
import { Link } from "react-router-dom";
import {
  BsFillPlusSquareFill,
  BsFillPencilFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { FcViewDetails } from "react-icons/fc";
import AuthService from "../../../services/authService";
import AddNewProblemModal from "./newProblem";
import ActionProblem from "./actionProblem";

class RightTopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalAddProblem: false,
      openedProblemId: null,
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

  showCollapse(problemId) {
    const { openedProblemId } = this.state;
    if (openedProblemId !== problemId) {
      this.setState({
        openedProblemId: problemId,
      });
    } else {
      this.setState({
        openedProblemId: null,
      });
    }
  }

  render() {
    const { topicInfo = {} } = this.props;
    const { isShowModalAddProblem, openedProblemId } = this.state;
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
                    >
                      {`${problem?.createdBy?.lastName || ""} ${
                        problem?.createdBy?.middleName || ""
                      } ${problem?.createdBy?.firstName || ""}`}
                    </Link>
                    <span className="ActionProblem">
                      {currentUser?.id === problem?.createdById ? <ActionProblem /> : null}
                    </span>
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
                      onClick={() => this.showCollapse(problem?.id)}
                    >
                      <FcViewDetails /> View Solution
                    </Button>
                    <Collapse in={openedProblemId === problem?.id}>
                      <div>
                        {problem?.solutions?.map((solution) => {
                          return (
                            <div key={`${solution?.id}`}>
                              <ul className="SolutionViewCard">
                                <li>
                                  <div className="SolutionMainLevel">
                                    <div className="SolutionAvatar">
                                      <img
                                        src={
                                          solution?.createdBy?.avatar ||
                                          "/image/icon-login.png"
                                        }
                                        alt=""
                                      />
                                    </div>
                                    <div className="SolutionBox">
                                      <div className="SolutionBoxHead">
                                        <h6 className="SolutionBoxName">
                                          <Link
                                            to={{
                                              pathname: routes.PERSONEL,
                                            }}
                                            state={{
                                              userId: solution?.createdById,
                                            }}
                                          >{`${
                                            solution?.createdBy?.lastName || ""
                                          } ${
                                            solution?.createdBy?.middleName ||
                                            ""
                                          } ${
                                            solution?.createdBy?.firstName || ""
                                          }`}</Link>
                                          <br />
                                          <span>
                                            {solution?.createdAt
                                              ? moment(
                                                  solution?.createdAt
                                                ).format(formatDateTime)
                                              : ""}
                                          </span>
                                        </h6>
                                        <div className="SolutionAction">
                                          {currentUser?.id ===
                                          solution?.createdById ? (
                                            <>
                                              <Button
                                                className="BtnSolutionAction"
                                                size="sm"
                                                variant="light"
                                              >
                                                <BsFillPencilFill className="IconUpdateSolution" />
                                              </Button>
                                              <Button
                                                className="BtnSolutionAction"
                                                size="sm"
                                                variant="light"
                                              >
                                                <BsFillTrashFill className="IconDeleteSolution" />
                                              </Button>
                                            </>
                                          ) : null}
                                        </div>
                                      </div>
                                      <div className="SolutionContent">
                                        {solution?.solution}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          );
                        })}
                        <hr />
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="BtnAddSolution"
                        >
                          <BsFillPlusSquareFill /> Add Solution
                        </Button>
                      </div>
                    </Collapse>
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
