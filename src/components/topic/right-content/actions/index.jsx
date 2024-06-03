import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Dropdown, Form } from "react-bootstrap";
import { BsFillPencilFill } from "react-icons/bs";
import { studySpaceAction } from "../../../../store/action";
import ModalCommon from "../../../commons/modal";

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
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="IconToggleActionGroupList"
              size="sm"
            ></Dropdown.Toggle>

            <Dropdown.Menu className="MenuActionGroupList">
              <Dropdown.Item
                onClick={() => this.setState({ isShowModal: true })}
                className="ItemActionGroupList"
              >
                <BsFillPencilFill className="BtnItemActionGroupList" />
                Update topic
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

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
