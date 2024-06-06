import React, { Component } from "react";
import { connect } from "react-redux";
import MenuMainCommon from "../common";

class MenuMessagePage extends Component {
  render() {
    return (
      <MenuMainCommon
        actionType=""
        payload={{}}
        title="Tìm kiếm bạn bè"
      />
    );
  }
}

export default connect()(MenuMessagePage);
