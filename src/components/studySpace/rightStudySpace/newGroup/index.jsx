import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import AuthService from "../../../../services/authService";
import Modal from "react-bootstrap/Modal";
import { Multiselect } from "multiselect-react-dropdown";
import "./index.css";

class NewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      groupName: "",
      privateMode: false,
      description: "",
      members: [],
    };
  }

  showModalNewGroup() {
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

  onSelectValue(values) {
    const membersIds = values.map((member) => {
      return member?.id;
    });
    this.setState({
      members: membersIds,
    });
  }

  createNewGroup() {
    alert("create new group func");
  }

  render() {
    const { isShowModal, members } = this.state;
    console.log("members", members);
    const currentUser = AuthService.getCurrentUser();
    const options = [
      { name: "Srigar", id: "88373737-dhdhhd-888" },
      { name: "Sam", id: "903939-dhdhhd-888" },
    ];

    return (
      <div>
        <InputGroup className="CreateNewGroup">
          <Button
            onClick={() => this.showModalNewGroup()}
            id="basic-addon-post-home"
            variant="light"
          >
            <img
              src={currentUser?.avatar || "/image/icon-login.png"}
              alt={currentUser?.firstName}
              className="CreateNewGroupAvatar"
            />
          </Button>
          <Form.Control
            className="CreateNewGroupInput"
            placeholder={`Hi ${currentUser?.lastName || ""} ${
              currentUser?.middleName || ""
            } ${currentUser?.firstName || ""}! create new group...`}
            aria-label="new group"
            aria-describedby="basic-addon-post-home"
            onClick={() => this.showModalNewGroup()}
          />
        </InputGroup>

        <Modal show={isShowModal} onHide={() => this.closeModal()}>
          <Modal.Header closeButton={true} className="HeaderModalUpdatePost">
            <Modal.Title className="TitlePostUpdate">
              Create new group
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
              onChange={(event) => this.onChangeName(event)}
            />
            <Form.Label>Group description</Form.Label>
            <Form.Control
              placeholder="group description..."
              aria-label="description"
              as="textarea"
              rows={4}
              name="description"
              onChange={(event) => this.onChangeDescription(event)}
            />
            <Form.Label>Members</Form.Label>
            <Multiselect
              options={options}
              onSelect={(value) => this.onSelectValue(value)}
              onRemove={this.onRemove}
              displayValue="name"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.createNewGroup()}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect()(NewGroup);