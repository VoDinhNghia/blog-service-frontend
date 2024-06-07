import React, { Component } from "react";
import "./index.css";
import { routes } from "../../../../constants/constant";
import MemberGroup from "./members";
import AuthService from "../../../../services/auth.service";
import { Card } from "react-bootstrap";
import { studySpaceAction } from "../../../../store/action.store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateNewTopicModal from "./create-topic";
import { showDateTime, getUserName } from "../../../../utils/util";
import GroupCardTitle from "./card-title";
import GroupCardFooter from "./card-footer";
import GroupCollapseTopic from "./collapse-topic";

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
    this.dispatch = this.props.dispatch;
    this.userId = this.props.userId;
  }

  showModal(groupId) {
    const { isShowModalMember } = this.state;
    this.setState({
      isShowModalMember: isShowModalMember !== groupId ? groupId : null,
    });
  }

  showTopics(groupId) {
    const { openedTopicGroupId } = this.state;
    this.setState({
      openedTopicGroupId: openedTopicGroupId !== groupId ? groupId : null,
    });
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
    });
  }

  closeModal(value) {
    this.setState(value);
  }

  fetchAllGroups() {
    const { limit, page } = this.state;
    setTimeout(() => {
      this.dispatch({
        type: studySpaceAction.GET_ALL_GROUP,
        payload: { limit, page, createdById: this.userId },
      });
    }, 100);
  }

  leaveGroup(groupId) {
    this.dispatch({ type: studySpaceAction.LEAVE_GROUP, groupId });
    this.fetchAllGroups();
  }

  deleteTopic(topicId) {
    this.dispatch({ type: studySpaceAction.DELETE_TOPIC, id: topicId });
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
                  <GroupCardTitle
                    group={group}
                    currentUser={currentUser}
                    fetchAllGroups={() => this.fetchAllGroups()}
                    leaveGroup={(id) => this.leaveGroup(id)}
                  />
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted TimeRightStudySpace">
                  {showDateTime(group?.createdAt)}{" "}
                  {currentUser?.id === group?.createdById ? null : (
                    <span>
                      được tạo bởi{" "}
                      <Link
                        to={routes.PERSONEL}
                        state={{ userId: group?.createdById }}
                      >
                        {getUserName(group?.createdBy)}
                      </Link>
                    </span>
                  )}
                </Card.Subtitle>
                <Card.Text>{group?.description}</Card.Text>
                <GroupCardFooter
                  openedTopicGroupId={openedTopicGroupId}
                  group={group}
                  showModal={(id) => this.showModal(id)}
                  showTopics={(id) => this.showTopics(id)}
                />
                <MemberGroup
                  isShowModalMember={isShowModalMember === group?.id}
                  closeModal={(value) => this.closeModal(value)}
                  permission={currentUser?.id === group?.createdById}
                  currentUser={currentUser}
                  groupInfo={group}
                  fetchAllGroups={() => this.fetchAllGroups()}
                />
                <div>
                  <GroupCollapseTopic
                    group={group}
                    currentUser={currentUser}
                    openedTopicGroupId={openedTopicGroupId}
                    isShowModalDeleteTopic={isShowModalDeleteTopic}
                    showModalNewTopic={(id) => this.showModalNewTopic(id)}
                    deleteTopic={(id) => this.deleteTopic(id)}
                    closeModal={(obj) => this.closeModal(obj)}
                    showModalDeleteTopic={() => this.showModalDeleteTopic()}
                  />
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
