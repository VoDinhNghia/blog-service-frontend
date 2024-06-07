import { Component } from "react";
import { Button } from "react-bootstrap";
import { MdTopic } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

class GroupCardFooter extends Component {
  render() {
    const {
      openedTopicGroupId = "",
      group = {},
      showTopics,
      showModal,
    } = this.props;
    return (
      <p className="BtnRightStudySpace">
        <Button
          className="BtnTopicRightStudySpace"
          variant="outline-primary"
          size="sm"
          aria-expanded={openedTopicGroupId === group?.id}
          onClick={() => showTopics(group?.id)}
        >
          <MdTopic /> Chủ đề
        </Button>{" "}
        <Button
          variant="outline-primary"
          size="sm"
          className="BtnMemberRightStudySpace"
          onClick={() => showModal(group?.id)}
        >
          <AiOutlineUsergroupAdd /> Thành viên
        </Button>
      </p>
    );
  }
}

export default GroupCardFooter;
