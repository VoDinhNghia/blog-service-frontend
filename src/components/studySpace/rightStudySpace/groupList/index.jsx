import React, { Component } from "react";
import "./index.css";
import Card from "react-bootstrap/Card";
import moment from "moment/moment";
import { formatDateTime, routes } from "../../../../common/constant";
import { Button } from "react-bootstrap";
import ActionGroupList from "./actions";
import MemberGroup from "./members";
import AuthService from "../../../../services/authService";
import Collapse from "react-bootstrap/Collapse";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { studySpaceAction } from "../../../../store/action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdTopic } from "react-icons/md";
import { FcViewDetails } from "react-icons/fc";

class GroupListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalMember: false,
      openedTopicGroupId: null,
    };
  }

  showModal(groupId) {
    const { isShowModalMember } = this.state;
    if (isShowModalMember !== groupId) {
      this.setState({
        isShowModalMember: groupId,
      });
    } else {
      this.setState({
        isShowModalMember: null,
      });
    }
  }

  showTopics(groupId) {
    const { openedTopicGroupId } = this.state;
    if (openedTopicGroupId !== groupId) {
      this.setState({
        openedTopicGroupId: groupId,
      });
    } else {
      this.setState({
        openedTopicGroupId: null,
      });
    }
  }

  closeModal(value) {
    this.setState(value);
  }

  fetchAllGroups() {
    const { dispatch, userId } = this.props;
    const { limit, page } = this.state;
    setTimeout(() => {
      dispatch({
        type: studySpaceAction.GET_ALL_GROUP,
        payload: { limit, page, createdById: userId },
      });
    }, 100);
  }

  leaveGroup(groupId) {
    const { dispatch } = this.props;
    dispatch({ type: studySpaceAction.LEAVE_GROUP, groupId });
    this.fetchAllGroups();
  }

  render() {
    const { groupList = [] } = this.props;
    const { isShowModalMember, openedTopicGroupId } = this.state;
    const currentUser = AuthService.getCurrentUser();

    return (
      <div>
        {groupList?.map((group) => {
          return (
            <Card className="RightStudySpace" key={group?.id}>
              <Card.Body>
                <Card.Title>
                  <span>
                    {group?.name}{" "}
                    <span className="ActionRightStudySpace">
                      {currentUser?.id === group?.createdById ? (
                        <ActionGroupList
                          groupInfo={group}
                          fetchAllGroups={() => this.fetchAllGroups()}
                        />
                      ) : null}
                      {group?.members?.find(
                        (mem) => mem?.memberId === currentUser?.id
                      ) ? (
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => this.leaveGroup(group?.id)}
                        >
                          Leave
                        </Button>
                      ) : null}
                    </span>
                  </span>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted TimeRightStudySpace">
                  {`${moment(group?.createdAt || "").format(formatDateTime)}`}{" "}
                  {currentUser?.id === group?.createdById ? null : (
                    <span>
                      created by{" "}
                      <Link
                        to={routes.PERSONEL}
                        state={{ userId: group?.createdById }}
                      >{`${group?.createdBy?.lastName || ""} ${
                        group?.createdBy?.middleName || ""
                      } ${group?.createdBy?.firstName || ""}`}</Link>
                    </span>
                  )}
                </Card.Subtitle>
                <Card.Text>{group?.description}</Card.Text>
                <p className="BtnRightStudySpace">
                  <Button
                    className="BtnTopicRightStudySpace"
                    variant="outline-primary"
                    aria-expanded={openedTopicGroupId === group?.id}
                    onClick={() => this.showTopics(group?.id)}
                  >
                    <MdTopic /> Topics
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="BtnMemberRightStudySpace"
                    onClick={() => this.showModal(group?.id)}
                  >
                    <AiOutlineUsergroupAdd /> Members
                  </Button>
                </p>
                <MemberGroup
                  isShowModalMember={isShowModalMember === group?.id}
                  closeModal={(value) => this.closeModal(value)}
                  permission={currentUser?.id === group?.createdById}
                  currentUser={currentUser}
                  groupInfo={group}
                  fetchAllGroups={() => this.fetchAllGroups()}
                />
                <div>
                  <Collapse in={openedTopicGroupId === group?.id}>
                    <div>
                      <hr />
                      <Row>
                        <Col className="col-6">
                          <Card className="flex-fill CardItemTopic" key={"##"}>
                            <Card.Body>
                              <Card.Title>title</Card.Title>
                              <Card.Subtitle>
                                createdAt, created by
                              </Card.Subtitle>
                              <Card.Text>description</Card.Text>
                              <Button variant="light" className="BtnViewDetailCardItem">
                                <Link to={routes.STUDY_SPACE_TOPIC}>
                                 <FcViewDetails /> View
                                </Link>
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      <hr />
                      <Button variant="outline-primary"><BsPlusCircle /> Add new topic</Button>
                    </div>
                  </Collapse>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default connect()(GroupListPage);
