import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import "./index.css";
import { studySpaceAction } from "../../../../../../store/action";

class ActionSolution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solution: "",
      isShowModal: false,
      isShowModalDelete: false,
    };
  }

  showModal() {
    this.setState({
      isShowModal: true,
    });
  }

  showModalDelete() {
    this.setState({
      isShowModalDelete: true,
    });
  }

  closeModal() {
    this.setState({
      isShowModal: false,
    });
  }

  closeModalDelete() {
    this.setState({
      isShowModalDelete: false,
    });
  }

  onChangeSolution(event) {
    this.setState({
      solution: event.target.value,
    });
  }

  updateSolution() {
    const { dispatch, solutionInfo } = this.props;
    const { solution } = this.state;
    dispatch({
      type: studySpaceAction.UPDATE_SOLUTION,
      id: solutionInfo?.id,
      payload: { solution },
    });
    this.props.fetchTopicInfo();
    this.closeModal();
  }

  deleteSolution() {
    const { dispatch, solutionInfo } = this.props;
    dispatch({
      type: studySpaceAction.DELETE_SOLUTION,
      id: solutionInfo?.id,
    });
    this.props.fetchTopicInfo();
    this.closeModalDelete();
  }

  render() {
    const { solutionInfo = {} } = this.props;
    const { isShowModal, isShowModalDelete } = this.state;
    return (
      <>
        <Button
          className="BtnSolutionAction"
          size="sm"
          variant="light"
          onClick={() => this.showModal()}
        >
          <BsFillPencilFill className="IconUpdateSolution" />
        </Button>
        <Button
          className="BtnSolutionAction"
          size="sm"
          variant="light"
          onClick={() => this.showModalDelete()}
        >
          <BsFillTrashFill className="IconDeleteSolution" />
        </Button>
        <Modal show={isShowModal} onHide={() => this.closeModal()}>
          <Modal.Header closeButton={true} className="HeaderModalUpdatePost">
            <Modal.Title className="TitlePostUpdate">
              Update solution
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Solution</Form.Label>
            <Form.Control
              placeholder="solution..."
              aria-label="solution"
              as="textarea"
              rows={4}
              name="solution"
              defaultValue={solutionInfo?.solution}
              onChange={(event) => this.onChangeSolution(event)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.updateSolution()}>Save</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={isShowModalDelete} size="sm">
          <Modal.Body>
            <p>
              Are you sure you want to delete this solution "
              <b>{solutionInfo?.solution?.slice(0, 10)}...</b>"?
            </p>
            <Button
              variant="danger"
              className="BtnCancleModalAddMember"
              onClick={() => this.closeModalDelete()}
            >
              Cancle
            </Button>
            <Button onClick={() => this.deleteSolution(solutionInfo?.id)}>
              Ok
            </Button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default connect()(ActionSolution);
