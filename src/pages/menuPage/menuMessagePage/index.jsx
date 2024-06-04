import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar } from "react-bootstrap";
import MenuMain from "../menuMain";
import SearchMenuPageCommon from "../../commons/searchMenuPage";

class MenuMessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: null,
    };
  }

  searchUser() {
    alert("Chua lam");
  }

  onChangeSearchKey(e) {
    alert("Chua lam");
  }

  render() {
    const { numberMsg = 0 } = this.props;

    return (
      <Navbar collapseOnSelect expand="sm" className="MenuMain">
        <Navbar.Brand>
          <SearchMenuPageCommon
            title="Tìm kiếm bạn bè"
            search={() => this.searchUser()}
            onChangeSearch={(e) => this.onChangeSearchKey(e)}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          data-bs-target="#navbarScroll"
        />
        <MenuMain numberMsg={numberMsg} />
      </Navbar>
    );
  }
}

export default connect()(MenuMessagePage);
