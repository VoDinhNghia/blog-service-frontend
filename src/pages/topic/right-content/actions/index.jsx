import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { studySpaceAction } from "../../../../store/action.store";
import ModalCommon from "../../../commons/modal";
import DropdownCommon from "../../../commons/dropdown";

class ActionTopicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      name: "",
      description: "",
    };
    this.dispatch = this.props.dispatch;
  }

  onChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  onChangeDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }

  updateTopic() {
    const { topicInfo = {} } = this.props;
    const { name, description } = this.state;
    const payload = {
      name: name || topicInfo?.name,
      description: description || topicInfo?.description,
    };
    this.dispatch({
      type: studySpaceAction.UPDATE_TOPIC,
      id: topicInfo?.id,
      payload,
    });
    setTimeout(() => {
      this.dispatch({
        type: studySpaceAction.GET_TOPIC_BY_ID,
        id: topicInfo?.id,
      });
    }, 100);
    this.setState({ isShowModal: false });
  }

  render() {
    const {
      topicInfo: { name = "", description = "" },
    } = this.props;
    const updateContent = (
      <>
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
      </>
    );
    return (
      <>
        <div>
          <DropdownCommon
            onShowModalUpdate={() => this.setState({ isShowModal: true })}
            isShowDelete={false}
          />
          <ModalCommon
            isShowModal={this.state.isShowModal}
            onClose={() => this.setState({ isShowModal: false })}
            titleHeader="Thêm mới chủ đề"
            content={updateContent}
            onAction={() => this.updateTopic()}
          />
        </div>
      </>
    );
  }
}

export default connect()(ActionTopicDetail);
