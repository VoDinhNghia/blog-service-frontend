import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import moment from "moment/moment";
import { formatDateTime, routes } from "../../../../constants/constant";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from "../../../../services/authService";
import ActionProblem from "./actions";
import SolutionList from "./solution";
import { studySpaceAction } from "../../../../store/action";
import { getUserName } from "../../../../utils/util";

class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedProblemId: null,
    };
    this.dispatch = this.props.dispatch;
  }

  showCollapse(problemId) {
    const { openedProblemId } = this.state;
    this.setState({
      openedProblemId: openedProblemId !== problemId ? problemId : null,
    });
  }

  fetchTopicInfo() {
    const { topicId } = this.props;
    setTimeout(() => {
      this.dispatch({ type: studySpaceAction.GET_TOPIC_BY_ID, id: topicId });
    }, 100);
  }

  render() {
    const { problemList = [] } = this.props;
    const { openedProblemId } = this.state;
    const currentUser = AuthService.getCurrentUser();
    const displayAction = (problem) => {
      return currentUser?.id === problem?.createdById ? (
        <ActionProblem
          problemInfo={problem}
          fetchTopicInfo={() => this.fetchTopicInfo()}
        />
      ) : null;
    };
    return (
      <>
        {problemList.map((problem) => {
          return (
            <Card className="RightTopicPage" key={problem?.id}>
              <Card.Body>
                <Card.Title>
                  <img
                    src={problem?.createdBy?.avatar || "/image/icon-login.png"}
                    alt=""
                    className="IconUserCreateProblem"
                  />
                  <Link
                    to={routes.PERSONEL}
                    state={{ userId: problem?.createdById }}
                  >
                    {getUserName(problem?.createdBy)}
                  </Link>
                  <span className="ActionProblem">
                    {displayAction(problem)}
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
                  <SolutionList
                    solutions={problem?.solutions}
                    problemId={problem?.id}
                    openedProblemId={openedProblemId}
                    currentUser={currentUser}
                    showCollapse={() => this.showCollapse(problem?.id)}
                    topicId={problem?.topicId}
                  />
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </>
    );
  }
}

export default connect()(ProblemList);
