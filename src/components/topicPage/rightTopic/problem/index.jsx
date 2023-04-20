import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import moment from "moment/moment";
import { formatDateTime, routes } from "../../../../common/constant";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from "../../../../services/authService";
import ActionProblem from "./actionProblem";
import SolutionList from "./solution";

class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedProblemId: null,
    };
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
    const { problemList = [] } = this.props;
    const { openedProblemId } = this.state;
    const currentUser = AuthService.getCurrentUser();
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
                    {`${problem?.createdBy?.lastName || ""} ${
                      problem?.createdBy?.middleName || ""
                    } ${problem?.createdBy?.firstName || ""}`}
                  </Link>
                  <span className="ActionProblem">
                    {currentUser?.id === problem?.createdById ? (
                      <ActionProblem />
                    ) : null}
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
