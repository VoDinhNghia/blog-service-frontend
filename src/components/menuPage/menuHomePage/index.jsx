import React, { Component } from "react";
import { postAction } from "../../../store/action";
import { connect } from "react-redux";
import SearchMenuPageCommon from "../../commons/searchMenuPage";
import { Navbar } from "react-bootstrap";
import "./index.css";
import MenuMain from "../menuMain";

class MenuHomePage extends Component {
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
    const { dispatch } = this.props;
    const { searchKey } = this.state;
    setTimeout(() => {
      dispatch({ type: postAction.GET_ALL_POST, payload: { searchKey } });
    }, 100);
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="sm" className="MenuMain">
        <Navbar.Brand>
          <SearchMenuPageCommon
            title="Tìm kiếm bài đăng theo tiêu đề..."
            search={() => this.searchPost()}
            onChangeSearch={(event) => this.onChangeSearch(event)}
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

export default connect()(MenuHomePage);
