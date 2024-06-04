import React, { Component } from "react";
import "./index.css";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { studySpaceAction } from "../../../../store/action";
import ModalCommon from "../../../commons/modal";

class AddNewProblemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: "",
    };
    this.dispatch = this.props.dispatch;
  }

  onChangeProblem(event) {
    this.setState({
      problem: event.target.value,
    });
  }

  createNewProblem() {
    const { topicId } = this.props;
    const { problem } = this.state;
    this.dispatch({
      type: studySpaceAction.CREATE_NEW_PROBLEM,
      payload: {
        topicId,
        problem,
      },
    });
    setTimeout(() => {
      this.dispatch({ type: studySpaceAction.GET_TOPIC_BY_ID, id: topicId });
    }, 100);
    this.props.closeModalAddProblem();
  }

  render() {
    const { isShowModalAddProblem = false } = this.props;
    const addContent = (
      <>
        <Form.Label>Nội dung vấn đề</Form.Label>
        <Form.Control
          placeholder="Viết vấn đề..."
          aria-label="problem"
          as="textarea"
          rows={4}
          name="problem"
          onChange={(event) => this.onChangeProblem(event)}
        />
      </>
    );
    return (
      <ModalCommon
        isShowModal={isShowModalAddProblem}
        onClose={() => this.props.closeModalAddProblem()}
        content={addContent}
        titleHeader="Thêm vấn đề"
        onAction={() => this.createNewProblem()}
      />
    );
  }
}

export default connect()(AddNewProblemModal);
