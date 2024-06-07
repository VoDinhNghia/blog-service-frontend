import { Component } from "react";
import { Button } from "react-bootstrap";
import ActionGroupList from "../actions";

class GroupCardTitle extends Component {
  render() {
    const {
      group = {},
      currentUser = {},
      fetchAllGroups,
      leaveGroup,
    } = this.props;
    const { name = "", members = [], id = "" } = group;
    return (
      <span>
        {name}{" "}
        <span className="ActionRightStudySpace">
          {currentUser?.id === group?.createdById ? (
            <ActionGroupList
              groupInfo={group}
              fetchAllGroups={() => fetchAllGroups()}
            />
          ) : null}
          {members?.find((mem) => mem?.memberId === currentUser?.id) ? (
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => leaveGroup(id)}
            >
              Rời nhóm
            </Button>
          ) : null}
        </span>
      </span>
    );
  }
}
export default GroupCardTitle;
