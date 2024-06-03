import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Dropdown, Form } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { studySpaceAction } from "../../../../../store/action";
import ModalCommon from "../../../../commons/modal";
import { typeModal } from "../../../../../common/constant";

class ActionProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: "",
      isShowModal: false,
      isShowModalDelete: false,
    };
    this.dispatch = this.props.dispatch;
  }

  onChangeProblem(event) {
    this.setState({
      problem: event.target.value,
    });
  }

  updateProblem() {
    const { problemInfo } = this.props;
    const { problem } = this.state;
    this.dispatch({
      type: studySpaceAction.UPDATE_PROBLEM,
      id: problemInfo?.id,
      payload: { problem },
    });
    this.props.fetchTopicInfo();
    this.setState({ isShowModal: false });
  }

  deleteProblem() {
    const { problemInfo } = this.props;
    this.dispatch({
      type: studySpaceAction.DELETE_PROBLEM,
      id: problemInfo?.id,
    });
    this.props.fetchTopicInfo();
    this.setState({ isShowModalDelete: false });
  }

  render() {
    const { problemInfo = {} } = this.props;
    const { isShowModal, isShowModalDelete } = this.state;
    const updateContent = (
      <>
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
      </>
    );
    const deleteContent = (
      <>
        <p>
          Bạn có chắc chắn muốn xóa vấn đề này "
          <b>{problemInfo?.problem?.slice(0, 10)}...</b>"?
        </p>
      </>
    );

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
                onClick={() => this.setState({ isShowModal: true })}
                className="ItemActionProlem"
              >
                <BsPencilSquare className="BtnItemActionGroupList" />
                Cập nhật
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.setState({ isShowModalDelete: true })}
                className="ItemActionProlem"
              >
                <BsTrash className="BtnItemActionDeleteProblem" />
                Xóa vấn đề
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <ModalCommon
            isShowModal={isShowModal}
            titleHeader="Cập nhật vấn đề"
            onAction={() => this.updateProblem()}
            onClose={() => this.setState({ isShowModal: false })}
            content={updateContent}
          />
          <ModalCommon
            isShowModal={isShowModalDelete}
            isShowHeader={false}
            isShowFooter={false}
            content={deleteContent}
            onAction={() => this.deleteProblem()}
            actionType={typeModal.DELETE}
            size="sm"
          />
        </div>
      </>
    );
  }
}

export default connect()(ActionProblem);
