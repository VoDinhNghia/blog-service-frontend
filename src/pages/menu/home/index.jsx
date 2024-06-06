import React, { Component } from "react";
import { postAction } from "../../../store/action.store";
import "./index.css";
import MenuMainCommon from "../common";

class MenuHomePage extends Component {
  render() {
    return (
      <MenuMainCommon
        actionType={postAction.GET_ALL_POST}
        payload={{}}
        title="Tìm kiếm bài đăng theo tiêu đề..."
      />
    );
  }
}

export default MenuHomePage;
