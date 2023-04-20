import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

class ActionProblem extends Component {
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

            <Dropdown.Menu className="MenuActionProblem">
              <Dropdown.Item
                onClick={() => this.showModal()}
                className="ItemActionProlem"
              >
                <BsFillPencilFill className="BtnItemActionGroupList" />
                Update problem
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.showModal()}
                className="ItemActionProlem"
              >
                <BsFillTrashFill className="BtnItemActionDeleteProblem" />
                Delete problem
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </>
    );
  }
}

export default connect()(ActionProblem);
