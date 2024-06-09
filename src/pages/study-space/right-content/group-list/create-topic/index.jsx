import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { studySpaceAction } from "../../../../../store/action.store";
import ModalCommon from "../../../../commons/modal";

class CreateNewTopicModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
    this.dispatch = this.props.dispatch;
  }

  onChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  onChangeDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }

  createNewTopic() {
    const { name, description } = this.state;
    const { groupId } = this.props;
    this.dispatch({
      type: studySpaceAction.CREATE_NEW_TOPIC,
      payload: { name, groupId: groupId, description },
    });
    setTimeout(() => {
      this.props.fetchAllGroups();
    }, 70);
    this.props.closeModal({ isShowModalNewTopic: false });
  }

  render() {
    const { isShowModalNewTopic } = this.props;
    const content = (
      <>
        <Form.Label>Tên chủ đề</Form.Label>
        <Form.Control
          placeholder="Viết tên chủ đề..."
          aria-label="topicName"
          name="topicName"
          onChange={(event) => this.onChangeName(event)}
        />
        <Form.Label>Mô tả</Form.Label>
        <Form.Control
          placeholder="Viết mô tả..."
          aria-label="description"
          as="textarea"
          rows={4}
          name="description"
          onChange={(event) => this.onChangeDescription(event)}
        />
      </>
    );
    return (
      <ModalCommon
        isShowModal={isShowModalNewTopic}
        onClose={() => this.props.closeModal({ isShowModalNewTopic: false })}
        titleHeader="Thêm chủ đề"
        content={content}
        onAction={() => this.createNewTopic()}
      />
    );
  }
}

export default connect()(CreateNewTopicModal);
