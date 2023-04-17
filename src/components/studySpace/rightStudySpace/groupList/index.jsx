import React, { Component } from "react";
import "./index.css";
import Card from "react-bootstrap/Card";
import moment from "moment/moment";
import { formatDateTime } from "../../../../common/constant";
import { Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import Table from "react-bootstrap/Table";
import { BsFillTrashFill } from "react-icons/bs";

class GroupListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedGroupId: "",
    };
  }

  showMembers(groupId) {
    const { openedGroupId } = this.state;
    if (openedGroupId !== groupId) {
      this.setState({
        openedGroupId: groupId,
      });
    } else {
      this.setState({
        openedGroupId: null,
      });
    }
  }

  render() {
    const { groupList = [] } = this.props;
    const { openedGroupId } = this.state;

    return (
      <div>
        {groupList?.map((group) => {
          return (
            <Card className="RightStudySpace" key={group?.id}>
              <Card.Body>
                <Card.Title>{group?.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted TimeRightStudySpace">
                  {moment(group?.createdAt || "").format(formatDateTime)}
                </Card.Subtitle>
                <Card.Text>{group?.description}</Card.Text>
                <Button
                  className="BtnRightStudySpace"
                  aria-expanded={openedGroupId === group?.id}
                  onClick={() => this.showMembers(group?.id)}
                >
                  Members
                </Button>
                <Button className="BtnRightStudySpace">Topics</Button>
                <div>
                  <Collapse in={openedGroupId === group?.id}>
                    <Table striped className="CollapaseRightStudySpace">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>name</th>
                          <th>join date</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group?.members?.map((member, index) => {
                          return (
                            <tr key={member?.id}>
                              <td>{index + 1}</td>
                              <td>{`${member?.member?.lastName || ""} ${
                                member?.member?.middleName || ""
                              } ${member?.member?.firstName || ""}`}</td>
                              <td>
                                {moment(member?.createdAt || "").format(
                                  formatDateTime
                                )}
                              </td>
                              <td>
                                <Button variant="light">
                                  <BsFillTrashFill className="IconDeleteComment" />
                                </Button>
                              </td>
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
