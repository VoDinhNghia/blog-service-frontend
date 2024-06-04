import { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import "./index.css";

class DropdownCommon extends Component {
  render() {
    const {
      isShowUpdate = true,
      onShowModalUpdate,
      isShowDelete = true,
      onShowModalDelete,
    } = this.props;
    return (
      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          id="dropdown-basic"
          className="IconToggleActionDropdownCommon"
          size="sm"
        ></Dropdown.Toggle>

        <Dropdown.Menu className="MenuActionDropdownCommon">
          {isShowUpdate ? (
            <Dropdown.Item
              onClick={() => onShowModalUpdate()}
              className="ItemActionDropdownCommon"
            >
              <BsPencilSquare className="BtnItemActionDropdownCommon" />
              Chỉnh sửa
            </Dropdown.Item>
          ) : null}
          {isShowDelete ? (
            <Dropdown.Item
              onClick={() => onShowModalDelete()}
              className="ItemColorDropdownCommon"
            >
              <BsTrash className="BtnActionDeleteDropdownCommon" /> Xóa
            </Dropdown.Item>
          ) : null}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default DropdownCommon;
