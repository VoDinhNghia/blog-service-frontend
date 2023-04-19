import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Dropdown, Modal, Form, Button } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { studySpaceAction } from "../../../../store/action";

class ActionTopicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isShowModalDelete: false,
      name: "",
      description: "",
    }
  }

  showModal() {
    this.setState({
      isShowModal: true,
    });
  }

  closeModal() {
    this.setState({
      isShowModal: false,
    });
  }

  onChangeName(event) {
    this.setState({
      name: event.target.value,
    })
  }

  onChangeDescription(event) {
    this.setState({
      description: event.target.value,
    })
  }

  updateTopic() {
    const { dispatch, topicInfo } = this.props;
    const { name, description } = this.state;
    const payload = {
      name: name || topicInfo?.name,
      description: description || topicInfo?.description,
    }
    dispatch({ type: studySpaceAction.UPDATE_TOPIC, id: topicInfo?.id, payload });
    setTimeout(() => {
      dispatch({ type: studySpaceAction.GET_TOPIC_BY_ID, id: topicInfo?.id });
    }, 100);
    this.closeModal();
  }

  render() {
    const { topicInfo: { name = "", description = "" } } = this.props;
    const { isShowModal } = this.state;
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
                Update topic
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
                topic
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Modal
            show={isShowModal}
            onHide={() => this.closeModal({ isShowModal: false })}
          >
            <Modal.Header closeButton={true} className="HeaderModalUpdateGroup">
              <Modal.Title className="TitlePostUpdate">
                Add new topic
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label>Topic name</Form.Label>
              <Form.Control
                placeholder="topic name..."
                aria-label="topicName"
                name="topicName"
                defaultValue={name}
                onChange={(event) => this.onChangeName(event)}
              />
              <Form.Label>Topic description</Form.Label>
              <Form.Control
                placeholder="topic description..."
                aria-label="description"
                as="textarea"
                rows={4}
                name="description"
                defaultValue={description}
                onChange={(event) => this.onChangeDescription(event)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.updateTopic()}>Save</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}

export default connect()(ActionTopicDetail);
