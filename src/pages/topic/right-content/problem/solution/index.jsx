import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import { routes } from "../../../../../constants/constant";
import { Button, Collapse, InputGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FcViewDetails } from "react-icons/fc";
import { studySpaceAction } from "../../../../../store/action";
import ActionSolution from "./action";
import { getUserName, showDateTime } from "../../../../../utils/util";

class SolutionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solutionText: "",
    };
    this.dispatch = this.props.dispatch;
  }

  onChangeSolution(event) {
    this.setState({
      solutionText: event.target.value,
    });
  }

  addSolution() {
    const { problemId } = this.props;
    const { solutionText } = this.state;
    this.dispatch({
      type: studySpaceAction.CREATE_NEW_SOLUTION,
      payload: {
        problemId,
        solution: solutionText,
      },
    });
    this.fetchTopicInfo();
    this.setState({
      solutionText: "",
    });
  }

  fetchTopicInfo() {
    const { topicId } = this.props;
    setTimeout(() => {
      this.dispatch({ type: studySpaceAction.GET_TOPIC_BY_ID, id: topicId });
    }, 100);
  }

  render() {
    const {
      solutions = [],
      problemId,
      openedProblemId,
      currentUser,
    } = this.props;
    const { solutionText } = this.state;
    const displayAction = (solution) => {
      return currentUser?.id === solution?.createdById ? (
        <ActionSolution
          solutionInfo={solution}
          fetchTopicInfo={() => this.fetchTopicInfo()}
        />
      ) : null;
    };

    return (
      <>
        <Button
          variant="outline-primary"
          size="sm"
          className="BtnViewSolution"
          onClick={() => this.props.showCollapse(problemId)}
        >
          <FcViewDetails /> Xem giải pháp
        </Button>
        <Collapse in={openedProblemId === problemId}>
          <div>
            {solutions?.map((solution) => {
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
                              >
                                {getUserName(solution?.createdBy)}
                              </Link>
                              <br />
                              <span>{showDateTime(solution?.createdAt)}</span>
                            </h6>
                            <div className="SolutionAction">
                              {displayAction(solution)}
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
            <InputGroup>
              <Form.Control
                className="InputNewPostHomePage"
                placeholder="Write your solution at here!"
                aria-label="new post"
                aria-describedby="basic-addon-post-home"
                value={solutionText}
                onChange={(event) => this.onChangeSolution(event)}
              />
              <Button
                variant="outline-primary"
                size="sm"
                className="BtnAddSolution"
                onClick={() => this.addSolution()}
              >
                <BsFillPlusSquareFill /> Send
              </Button>
            </InputGroup>
          </div>
        </Collapse>
      </>
    );
  }
}

export default connect()(SolutionList);
