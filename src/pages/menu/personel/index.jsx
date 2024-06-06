import React, { Component } from "react";
import { postAction } from "../../../store/action.store";
import AuthService from "../../../services/auth.service";
import MenuMainCommon from "../common";

class MenuPersonelPage extends Component {
  render() {
    const { userId } = this.props;
    const currentUser = AuthService.getCurrentUser();
    return (
      <MenuMainCommon
        actionType={postAction.GET_ALL_POST_PERSONEL}
        payload={{ userId: userId ?? currentUser?.id }}
        title="Tìm kiếm bài đăng theo tiêu đề..."
      />
    );
  }
}

export default MenuPersonelPage;
