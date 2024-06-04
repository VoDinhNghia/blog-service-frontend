import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { studySpaceAction } from "../../../../../store/action";
import ModalCommon from "../../../../commons/modal";
import { typeModal } from "../../../../../constants/constant";
import DropdownCommon from "../../../../commons/dropdown";

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
          <DropdownCommon
            onShowModalUpdate={() => this.setState({ isShowModal: true })}
            onShowModalDelete={() => this.setState({ isShowModalDelete: true })}
          />
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
