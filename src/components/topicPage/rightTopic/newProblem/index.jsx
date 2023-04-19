import React, { Component } from "react";
import "./index.css";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { studySpaceAction } from "../../../../store/action";

class AddNewProblemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: "",
    };
  }

  onChangeProblem(event) {
    this.setState({
      problem: event.target.value,
    });
  }

  createNewProblem() {
    const { dispatch, topicId } = this.props;
    const { problem } = this.state;
    dispatch({
      type: studySpaceAction.CREATE_NEW_PROBLEM,
      payload: {
        topicId,
        problem,
      },
    });
    setTimeout(() => {
      dispatch({ type: studySpaceAction.GET_TOPIC_BY_ID, id: topicId });
    }, 100);
    this.props.closeModalAddProblem();
  }

  render() {
    const { isShowModalAddProblem = false } = this.props;
    return (
      <Modal
        show={isShowModalAddProblem}
        onHide={() => this.props.closeModalAddProblem()}
      >
        <Modal.Header closeButton={true} className="HeaderModalUpdatePost">
          <Modal.Title className="TitlePostUpdate">
            Create new problem
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Problem</Form.Label>
          <Form.Control
            placeholder="problem..."
            aria-label="problem"
            as="textarea"
            rows={4}
            name="problem"
            onChange={(event) => this.onChangeProblem(event)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.createNewProblem()}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect()(AddNewProblemModal);
