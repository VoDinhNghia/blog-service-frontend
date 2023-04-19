import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

class ActionTopicDetail extends Component {
  render() {
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
        </div>
      </>
    );
  }
}

export default connect()(ActionTopicDetail);
