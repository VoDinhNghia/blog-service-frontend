import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Form, Modal, Button } from "react-bootstrap";
import { studySpaceAction } from "../../../../../store/action";

class CreateNewTopicModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
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
    const { dispatch, groupId } = this.props;
    const { name, description } = this.state;
    dispatch({
      type: studySpaceAction.CREATE_NEW_TOPIC,
      payload: { name, groupId, description },
    });
    this.props.fetchAllGroups();
    this.props.closeModal({ isShowModalNewTopic: false });
  }

  render() {
    const { isShowModalNewTopic } = this.props;
    return (
      <Modal
        show={isShowModalNewTopic}
        onHide={() => this.props.closeModal({ isShowModalNewTopic: false })}
      >
        <Modal.Header closeButton={true} className="HeaderModalUpdateGroup">
          <Modal.Title className="TitlePostUpdate">Thêm chủ đề</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.createNewTopic()} variant="outline-primary">Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect()(CreateNewTopicModal);
