import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import Form from "react-bootstrap/Form";
import { studySpaceAction } from "../../../../../store/action.store";
import "./index.css";
import ModalCommon from "../../../../commons/modal";
import DropdownCommon from "../../../../commons/dropdown";
import { typeModal } from "../../../../../constants/constant";
import { sliceString } from "../../../../../utils/util";

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

    this.dispatch = this.props.dispatch;
    this.groupInfo = this.props.groupInfo;
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
    const { groupName, privateMode, description } = this.state;
    const payload = {
      name: groupName || groupName?.name,
      privateMode: Boolean(privateMode || this.groupInfo?.privateMode),
      description: description || this.groupInfo?.description,
    };
    this.dispatch({
      type: studySpaceAction.UPDATE_GROUP,
      id: this.groupInfo?.id,
      payload,
    });
    this.fetchGroup();
    this.setState({ isShowModal: false });
  }

  deleteGroup() {
    this.dispatch({
      type: studySpaceAction.DELETE_GROUP,
      id: this.groupInfo?.id,
    });
    this.fetchGroup();
    this.setState({ isShowModalDelete: false });
  }

  fetchGroup() {
    setTimeout(() => {
      this.props.fetchAllGroups();
    }, 70);
  }

  render() {
    const { groupInfo = {} } = this.props;
    const { isShowModal, isShowModalDelete } = this.state;
    const updateContent = (
      <>
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
      </>
    );
    const deleteContent = (
      <p>
        Bạn có chắc chắn muốn xóa nhóm: "
        <b>{sliceString(groupInfo?.name, 20)}</b>"?
      </p>
    );

    return (
      <>
        <div className="ActionGroupList">
          <DropdownCommon
            onShowModalUpdate={() =>
              this.setState({
                isShowModal: true,
              })
            }
            onShowModalDelete={() =>
              this.setState({
                isShowModalDelete: true,
              })
            }
          />
          <ModalCommon
            isShowModal={isShowModal}
            onClose={() => this.setState({ isShowModal: false })}
            content={updateContent}
            titleHeader="Cập nhật thông tin nhóm"
            onAction={() => this.updateGroup()}
          />
          <ModalCommon
            isShowModal={isShowModalDelete}
            onClose={() => this.setState({ isShowModalDelete: false })}
            content={deleteContent}
            isShowHeader={false}
            actionType={typeModal.DELETE}
            isShowFooter={false}
            onAction={() => this.deleteGroup()}
            size="sm"
          />
        </div>
      </>
    );
  }
}

export default connect()(ActionGroupList);
