import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import moment from "moment/moment";
import { formatDateTime, routes } from "../../../../../common/constant";
import { Button, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsFillPlusSquareFill,
  BsFillPencilFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { FcViewDetails } from "react-icons/fc";

class SolutionList extends Component {
  render() {
    const {
      solutions = [],
      problemId,
      openedProblemId,
      currentUser,
    } = this.props;
    return (
      <>
        <Button
          variant="outline-primary"
          size="sm"
          className="BtnViewSolution"
          onClick={() => this.props.showCollapse(problemId)}
        >
          <FcViewDetails /> View Solution
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
                              >{`${solution?.createdBy?.lastName || ""} ${
                                solution?.createdBy?.middleName || ""
                              } ${solution?.createdBy?.firstName || ""}`}</Link>
                              <br />
                              <span>
                                {solution?.createdAt
                                  ? moment(solution?.createdAt).format(
                                      formatDateTime
                                    )
                                  : ""}
                              </span>
                            </h6>
                            <div className="SolutionAction">
                              {currentUser?.id === solution?.createdById ? (
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
      </>
    );
  }
}

export default connect()(SolutionList);
