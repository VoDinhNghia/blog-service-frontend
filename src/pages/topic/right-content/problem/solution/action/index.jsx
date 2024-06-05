import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import "./index.css";
import { studySpaceAction } from "../../../../../../store/action.store";
import ModalCommon from "../../../../../commons/modal";
import { typeModal } from "../../../../../../constants/constant";

class ActionSolution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solution: "",
      isShowModal: false,
      isShowModalDelete: false,
    };
    this.dispatch = this.props.dispatch;
  }

  onChangeSolution(event) {
    this.setState({
      solution: event.target.value,
    });
  }

  updateSolution() {
    const { solutionInfo } = this.props;
    const { solution } = this.state;
    this.dispatch({
      type: studySpaceAction.UPDATE_SOLUTION,
      id: solutionInfo?.id,
      payload: { solution },
    });
    this.props.fetchTopicInfo();
    this.setState({ isShowModal: false });
  }

  deleteSolution() {
    const { solutionInfo } = this.props;
    this.dispatch({
      type: studySpaceAction.DELETE_SOLUTION,
      id: solutionInfo?.id,
    });
    this.props.fetchTopicInfo();
    this.setState({ isShowModalDelete: false });
  }

  render() {
    const { solutionInfo = {} } = this.props;
    const { isShowModal, isShowModalDelete } = this.state;
    const updateContent = (
      <>
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
      </>
    );
    const deleteContent = (
      <>
        <p>
          Are you sure you want to delete this solution "
          <b>{solutionInfo?.solution?.slice(0, 10)}...</b>"?
        </p>
      </>
    );
    return (
      <>
        <Button
          className="BtnSolutionAction"
          size="sm"
          variant="light"
          onClick={() => this.setState({ isShowModal: true })}
        >
          <BsFillPencilFill className="IconUpdateSolution" />
        </Button>
        <Button
          className="BtnSolutionAction"
          size="sm"
          variant="light"
          onClick={() => this.setState({ isShowModalDelete: true })}
        >
          <BsFillTrashFill className="IconDeleteSolution" />
        </Button>
        <ModalCommon
          isShowModal={isShowModal}
          titleHeader="Cập nhật giải pháp"
          onClose={() => this.setState({ isShowModal: false })}
          content={updateContent}
          onAction={() => this.updateSolution()}
        />
        <ModalCommon
          isShowModal={isShowModalDelete}
          onClose={() => this.setState({ isShowModalDelete: false })}
          content={deleteContent}
          isShowHeader={false}
          isShowFooter={false}
          actionType={typeModal.DELETE}
          size="sm"
          onAction={() => this.deleteSolution()}
        />
      </>
    );
  }
}

export default connect()(ActionSolution);
