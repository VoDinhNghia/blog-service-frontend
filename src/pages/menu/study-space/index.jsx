import React, { Component } from "react";
import { studySpaceAction } from "../../../store/action.store";
import MenuMainCommon from "../common";

class MenuStudySpacePage extends Component {
  render() {
    const { userId } = this.props;
    return (
      <MenuMainCommon
        actionType={studySpaceAction.GET_ALL_GROUP}
        payload={{ createdById: userId }}
        title="Tìm kiếm nhóm theo tiêu đề..."
      />
    );
  }
}

export default MenuStudySpacePage;
