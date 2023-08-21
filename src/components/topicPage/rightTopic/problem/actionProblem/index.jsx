import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Dropdown, Button, Modal, Form } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { studySpaceAction } from "../../../../../store/action";

class ActionProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: "",
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

  onChangeProblem(event) {
    this.setState({
      problem: event.target.value,
    });
  }

  updateProblem() {
    const { dispatch, problemInfo } = this.props;
    const { problem } = this.state;
    dispatch({
      type: studySpaceAction.UPDATE_PROBLEM,
      id: problemInfo?.id,
      payload: { problem },
    });
    this.props.fetchTopicInfo();
    this.closeModal();
  }

  deleteProblem() {
    const { dispatch, problemInfo } = this.props;
    dispatch({
      type: studySpaceAction.DELETE_PROBLEM,
      id: problemInfo?.id,
    });
    this.props.fetchTopicInfo();
    this.closeModalDelete();
  }
  render() {
    const { problemInfo = {} } = this.props;
    const { isShowModal, isShowModalDelete } = this.state;

    return (
      <>
        <div>
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="IconToggleActionGroupList"
              size="sm"
            ></Dropdown.Toggle>

            <Dropdown.Menu className="MenuActionProblem">
              <Dropdown.Item
                onClick={() => this.showModal()}
                className="ItemActionProlem"
              >
                <BsPencilSquare className="BtnItemActionGroupList" />
                Cập nhật
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.showModalDelete()}
                className="ItemActionProlem"
              >
                <BsTrash className="BtnItemActionDeleteProblem" />
                Xóa vấn đề
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Modal show={isShowModal} onHide={() => this.closeModal()}>
            <Modal.Header closeButton={true} className="HeaderModalUpdatePost">
              <Modal.Title className="TitlePostUpdate">
                Cạp nhật vấn đề
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label>Vấn đề</Form.Label>
              <Form.Control
                placeholder="Viết vấn đề..."
                aria-label="problem"
                as="textarea"
                rows={4}
                name="problem"
                defaultValue={problemInfo?.problem}
                onChange={(event) => this.onChangeProblem(event)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.updateProblem()}>Lưu</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={isShowModalDelete} size="sm">
            <Modal.Body>
              <p>
                Bạn có chắc chắn muốn xóa vấn đề này "
                <b>{problemInfo?.problem?.slice(0, 10)}...</b>"?
              </p>
              <Button
                variant="danger"
                className="BtnCancleModalAddMember"
                onClick={() => this.closeModalDelete()}
              >
                Hủy
              </Button>
              <Button onClick={() => this.deleteProblem()}>
                Đồng ý
              </Button>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}

export default connect()(ActionProblem);
