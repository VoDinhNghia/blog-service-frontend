import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import Dropdown from "react-bootstrap/Dropdown";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { studySpaceAction } from "../../../../../store/action.store";
import "./index.css";

class ActionGroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isShowModalDelete: false,
      groupName: "",
      privateMode: false,
      description: "",
    };
  }

  showModal(value) {
    this.setState(value);
  }

  closeModal(value) {
    this.setState(value);
  }

  onChangeName(event) {
    this.setState({
      groupName: event.target.value,
    });
  }

  onChangePrivateMode(event) {
    this.setState({
      privateMode: event.target.value,
    });
  }

  onChangeDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }

  updateGroup() {
    const { dispatch, groupInfo = {} } = this.props;
    const { groupName, privateMode, description } = this.state;
    const payload = {
      name: groupName || groupName?.name,
      privateMode: Boolean(privateMode || groupInfo?.privateMode),
      description: description || groupInfo?.description,
    };
    dispatch({
      type: studySpaceAction.UPDATE_GROUP,
      id: groupInfo?.id,
      payload,
    });
    this.props.fetchAllGroups();
    this.closeModal({ isShowModal: false });
  }

  deleteGroup() {
    const { dispatch, groupInfo = {} } = this.props;
    dispatch({ type: studySpaceAction.DELETE_GROUP, id: groupInfo?.id });
    this.props.fetchAllGroups();
    this.closeModal({ isShowModalDelete: false });
  }

  render() {
    const { groupInfo = {} } = this.props;
    const { isShowModal, isShowModalDelete } = this.state;

    return (
      <>
        <div className="ActionGroupList">
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="IconToggleActionGroupList"
              size="sm"
            ></Dropdown.Toggle>

            <Dropdown.Menu className="MenuActionGroupList">
              <Dropdown.Item
                onClick={() =>
                  this.showModal({
                    isShowModal: true,
                  })
                }
                className="ItemActionGroupList"
              >
                <BsFillPencilFill className="BtnItemActionGroupList" />
                Update group
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  this.showModal({
                    isShowModalDelete: true,
                  })
                }
                className="ItemActionGroupList"
              >
                <BsFillTrashFill className="BtnDeleteActionGroupList" /> Delete
                group
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Modal
            show={isShowModal}
            onHide={() => this.closeModal({ isShowModal: false })}
          >
            <Modal.Header closeButton={true} className="HeaderModalUpdateGroup">
              <Modal.Title className="TitlePostUpdate">
                Update group
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label>Private mode:</Form.Label>
              <Form.Select
                className="browser-default custom-select"
                defaultValue={false}
                name="privateMode"
                onChange={(event) => this.onChangePrivateMode(event)}
              >
                <option value={false}>false</option>
                <option value={true}>true</option>
              </Form.Select>
              <Form.Label>Group name</Form.Label>
              <Form.Control
                placeholder="group name..."
                aria-label="groupName"
                name="groupName"
                defaultValue={groupInfo?.name}
                onChange={(event) => this.onChangeName(event)}
              />
              <Form.Label>Group description</Form.Label>
              <Form.Control
                placeholder="group description..."
                aria-label="description"
                as="textarea"
                rows={4}
                name="description"
                defaultValue={groupInfo?.description}
                onChange={(event) => this.onChangeDescription(event)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.updateGroup()}>Save</Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={isShowModalDelete}
            onHide={() => this.closeModal({ isShowModalDelete: false })}
            size="sm"
          >
            <Modal.Body>
              <p>
                Are you sure you want to delete this group "
                <b>{groupInfo?.name?.slice(0, 10)}...</b>"?
              </p>
              <Button
                variant="danger"
                className="BtnCancleModalAddMember"
                onClick={() => this.closeModal({ isShowModalDelete: false })}
              >
                Cancle
              </Button>
              <Button onClick={() => this.deleteGroup()}>Ok</Button>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}

export default connect()(ActionGroupList);
