import React, { Component } from "react";
import "./index.css";
import Card from "react-bootstrap/Card";
import moment from "moment/moment";
import { formatDateTime } from "../../../../common/constant";
import { Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import Table from "react-bootstrap/Table";
import { BsFillTrashFill } from "react-icons/bs";
import ActionGroupList from "./actions";
import MemberGroup from "./members";
import AuthService from "../../../../services/authService";

class GroupListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedTopicGroupId: "",
      isShowModalMember: false,
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

  closeModal(value) {
    this.setState(value);
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
                          fetchAllGroups={() => this.props.fetchAllGroups()}
                        />
                      ) : null}
                    </span>
                  </span>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted TimeRightStudySpace">
                  {moment(group?.createdAt || "").format(formatDateTime)}
                </Card.Subtitle>
                <Card.Text>{group?.description}</Card.Text>
                <p className="BtnRightStudySpace">
                  <Button
                    className="BtnTopicRightStudySpace"
                    aria-expanded={openedTopicGroupId === group?.id}
                    onClick={() => this.showTopics(group?.id)}
                  >
                    Topics
                  </Button>
                  <Button
                    className="BtnMemberRightStudySpace"
                    onClick={() => this.showModal(group?.id)}
                  >
                    Members
                  </Button>
                </p>
                <MemberGroup
                  memberList={group?.members}
                  isShowModalMember={isShowModalMember === group?.id}
                  closeModal={(value) => this.closeModal(value)}
                  permission={currentUser?.id === group?.createdById}
                />
                <div>
                  <Collapse in={openedTopicGroupId === group?.id}>
                    <Table striped className="CollapaseRightStudySpace">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>name</th>
                          <th>createdAt</th>
                          {currentUser?.id === group?.createdById ? (
                            <th>action</th>
                          ) : null}
                        </tr>
                      </thead>
                      <tbody>
                        {group?.topics?.map((topic, index) => {
                          return (
                            <tr key={topic?.id}>
                              <td>{index + 1}</td>
                              <td>{`${topic?.name || ""}`}</td>
                              <td>
                                {moment(topic?.createdAt || "").format(
                                  formatDateTime
                                )}
                              </td>
                              {currentUser?.id === group?.createdById ? (
                                <td>
                                  <Button variant="light" size="sm">
                                    <BsFillTrashFill className="IconDeleteComment" />
                                  </Button>
                                </td>
                              ) : null}
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
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

export default GroupListPage;
