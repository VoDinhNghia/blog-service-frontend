import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import AuthService from "../../../../services/authService";
import Modal from "react-bootstrap/Modal";
import { Multiselect } from "multiselect-react-dropdown";
import "./index.css";
import { studySpaceAction, userAction } from "../../../../store/action";

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

  componentDidMount() {
    this.fetchAllUsers();
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
    const { dispatch } = this.props;
    const { groupName, privateMode, description, members } = this.state;
    const payload = {
      name: groupName,
      description,
      privateMode: Boolean(privateMode),
      members,
    }
    dispatch({ type: studySpaceAction.CREATE_NEW_GROUP, payload });
    setTimeout(() => {
      this.props.fetchAllGroups();
    }, 100);
    this.closeModal();
  }

  fetchAllUsers() {
    const { dispatch } = this.props;
    dispatch({ type: userAction.GET_ALL_USER, })
  }

  render() {
    const { userList = [] } = this.props;
    const { isShowModal } = this.state;
    const currentUser = AuthService.getCurrentUser();
    const userOptions = userList.map((user) => {
      return {
        name: `${user?.lastName || ""} ${user?.middleName || ""} ${user?.firstName || ""}`,
        id: user?.id,
      }
    })

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
              options={userOptions}
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

function mapStateToProps(state) {
  return {
    userList: state.UserReducer.userList,
  };
}
export default connect(mapStateToProps)(NewGroup);
