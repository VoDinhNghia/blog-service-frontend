import React, { Component } from "react";
import "./index.css";
import moment from "moment/moment";
import { formatDateTime, routes } from "../../../../common/constant";
import ActionGroupList from "./actions";
import MemberGroup from "./members";
import AuthService from "../../../../services/authService";
import { Collapse, Modal, Col, Row, Button, Card } from "react-bootstrap";
import { studySpaceAction } from "../../../../store/action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BsPlusCircle, BsFillTrashFill } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdTopic } from "react-icons/md";
import { FcViewDetails } from "react-icons/fc";
import CreateNewTopicModal from "./newTopic";

class GroupListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalMember: false,
      openedTopicGroupId: null,
      isShowModalNewTopic: false,
      groupId: null,
      isShowModalDeleteTopic: false,
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

  showModalNewTopic(groupId) {
    this.setState({
      isShowModalNewTopic: true,
      groupId,
    });
  }

  showModalDeleteTopic() {
    this.setState({
      isShowModalDeleteTopic: true,
    })
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

  deleteTopic(topicId) {
    const { dispatch } = this.props;
    dispatch({ type: studySpaceAction.DELETE_TOPIC, id: topicId });
    this.fetchAllGroups();
    this.closeModal({
      isShowModalDeleteTopic: false,
    });
  }

  render() {
    const { groupList = [] } = this.props;
    const {
      isShowModalMember,
      openedTopicGroupId,
      isShowModalNewTopic,
      groupId,
      isShowModalDeleteTopic,
    } = this.state;
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
                        {group?.topics?.map((topic) => {
                          return (
                            <Col className="col-6" key={topic?.id}>
                              <Card
                                className="flex-fill CardItemTopic"
                                key={topic?.id}
                              >
                                <Card.Body>
                                  <Card.Title>
                                    <Link
                                      to={routes.STUDY_SPACE_TOPIC}
                                      state={{ topicId: topic?.id }}
                                      style={{ color: "#283035" }}
                                    >
                                      {topic?.name?.length > 30
                                        ? `${topic?.name?.slice(0, 30)}...`
                                        : topic?.name}
                                    </Link>
                                  </Card.Title>
                                  <Card.Text>
                                    {topic?.description?.length > 40
                                      ? `${topic?.description?.slice(0, 40)}...`
                                      : topic?.description}
                                  </Card.Text>
                                  <Button
                                    variant="light"
                                    className="BtnDeleteCardItemTopic"
                                    size="sm"
                                    onClick={() => this.showModalDeleteTopic()}
                                  >
                                    <BsFillTrashFill /> Delete
                                  </Button>
                                  <Button
                                    variant="light"
                                    className="BtnViewDetailCardItem"
                                    size="sm"
                                  >
                                    <Link
                                      to={routes.STUDY_SPACE_TOPIC}
                                      state={{ topicId: topic?.id }}
                                    >
                                      <FcViewDetails /> View
                                    </Link>
                                  </Button>
                                  <Modal
                                    show={isShowModalDeleteTopic}
                                    onHide={() => this.closeModal({ isShowModalDeleteTopic: false })}
                                    size="sm"
                                  >
                                    <Modal.Body>
                                      <p>
                                        Are you sure you want to delete this
                                        topic "<b>{topic?.name?.slice(0, 10)}...</b>"?
                                      </p>
                                      <Button
                                        variant="danger"
                                        className="BtnCancleModalAddMember"
                                        onClick={() => this.closeModal({ isShowModalDeleteTopic: false })}
                                      >
                                        Cancle
                                      </Button>
                                      <Button
                                        onClick={() => this.deleteTopic(topic?.id)}
                                      >
                                        Ok
                                      </Button>
                                    </Modal.Body>
                                  </Modal>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                      <hr />
                      {currentUser?.id === group?.createdById ||
                      group?.members?.find(
                        (mem) => mem?.memberId === currentUser?.id
                      ) ? (
                        <Button
                          variant="outline-primary"
                          onClick={() => this.showModalNewTopic(group?.id)}
                        >
                          <BsPlusCircle /> Add new topic
                        </Button>
                      ) : null}
                    </div>
                  </Collapse>
                </div>
              </Card.Body>
            </Card>
          );
        })}
        <CreateNewTopicModal
          isShowModalNewTopic={isShowModalNewTopic}
          closeModal={(value) => this.closeModal(value)}
          groupId={groupId}
          fetchAllGroups={() => this.fetchAllGroups()}
        />
      </div>
    );
  }
}

export default connect()(GroupListPage);
