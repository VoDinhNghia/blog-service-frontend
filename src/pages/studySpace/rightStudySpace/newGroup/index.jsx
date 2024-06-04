import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import AuthService from "../../../../services/auth.service";
import Modal from "react-bootstrap/Modal";
import { Multiselect } from "multiselect-react-dropdown";
import "./index.css";
import { studySpaceAction } from "../../../../store/action";
import Select from "react-select";
import { optionPrivateMode } from "../../../../utils/new-post.util";

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
      privateMode: event.value,
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
    };
    dispatch({ type: studySpaceAction.CREATE_NEW_GROUP, payload });
    setTimeout(() => {
      this.props.fetchAllGroups();
    }, 100);
    this.closeModal();
  }

  render() {
    const { userList = [] } = this.props;
    const { isShowModal } = this.state;
    const currentUser = AuthService.getCurrentUser();
    const userOptions = userList.map((user) => {
      return {
        name: `${user?.lastName || ""} ${user?.middleName || ""} ${
          user?.firstName || ""
        }`,
        id: user?.id,
      };
    });

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
            placeholder={`Xin chào ${currentUser?.lastName || ""} ${
              currentUser?.middleName || ""
            } ${currentUser?.firstName || ""}! Tạo nhóm mới...`}
            aria-label="new group"
            aria-describedby="basic-addon-post-home"
            onClick={() => this.showModalNewGroup()}
          />
        </InputGroup>

        <Modal show={isShowModal} onHide={() => this.closeModal()}>
          <Modal.Header closeButton={true} className="HeaderModalUpdatePost">
            <Modal.Title className="TitlePostUpdate">Tạo nhóm mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Select
              getOptionLabel={(e) => (
                <span>
                  {e.icon} {e.label}
                </span>
              )}
              defaultValue={optionPrivateMode.find((op) => !op.value)}
              name="privateMode"
              options={optionPrivateMode}
              onChange={(event) => this.onChangePrivateMode(event)}
            />

            <Multiselect
              options={userOptions}
              onSelect={(value) => this.onSelectValue(value)}
              onRemove={this.onRemove}
              displayValue="name"
              className="mt-2"
              placeholder="Thêm thành viên nhóm"
            />
            <Form.Control
              className="mt-2"
              placeholder="Nhập vào tên nhóm..."
              aria-label="groupName"
              name="groupName"
              onChange={(event) => this.onChangeName(event)}
            />
            <Form.Control
              placeholder="Nhập vào mô tả..."
              aria-label="description"
              as="textarea"
              rows={4}
              name="description"
              className="mt-2"
              onChange={(event) => this.onChangeDescription(event)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => this.createNewGroup()}
            >
              Lưu
            </Button>
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
