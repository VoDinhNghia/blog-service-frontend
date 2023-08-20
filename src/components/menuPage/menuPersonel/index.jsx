import React, { Component } from "react";
import { postAction } from "../../../store/action";
import { connect } from "react-redux";
import MenuMain from "../menuMain";
import AuthService from "../../../services/authService";
import SearchMenuPageCommon from "../../commons/searchMenuPage";
import { Navbar } from "react-bootstrap";

class MenuPersonelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: null,
    };
  }

  onChangeSearch(event) {
    const key = event.target.value;
    this.setState({
      searchKey: key,
    });
    this.searchPost();
  }

  searchPost() {
    const { dispatch, userId } = this.props;
    const { searchKey } = this.state;
    const currentUser = AuthService.getCurrentUser();
    setTimeout(() => {
      dispatch({
        type: postAction.GET_ALL_POST_PERSONEL,
        payload: { searchKey, userId: userId || currentUser?.id },
      });
    }, 100);
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="sm" className="MenuMain">
        <Navbar.Brand>
          <SearchMenuPageCommon
            title="Tìm kiếm bài đăng theo tiêu đề..."
            search={() => this.searchPost()}
            onChangeSearch={(e) => this.onChangeSearch(e)}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          data-bs-target="#navbarScroll"
        />
        <MenuMain />
      </Navbar>
    );
  }
}

export default connect()(MenuPersonelPage);
