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
          <Modal.Title className="TitlePostUpdate">Add new topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Topic name</Form.Label>
          <Form.Control
            placeholder="topic name..."
            aria-label="topicName"
            name="topicName"
            onChange={(event) => this.onChangeName(event)}
          />
          <Form.Label>Topic description</Form.Label>
          <Form.Control
            placeholder="topic description..."
            aria-label="description"
            name="description"
            onChange={(event) => this.onChangeDescription(event)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.createNewTopic()}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect()(CreateNewTopicModal);
