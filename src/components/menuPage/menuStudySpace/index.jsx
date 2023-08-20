import React, { Component } from "react";
import { connect } from "react-redux";
import MenuMain from "../menuMain";
import { studySpaceAction } from "../../../store/action";
import SearchMenuPageCommon from "../../commons/searchMenuPage";
import { Navbar } from "react-bootstrap";

class MenuStudySpacePage extends Component {
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
    this.searchGroup();
  }

  searchGroup() {
    const { dispatch, userId } = this.props;
    const { searchKey } = this.state;
    setTimeout(() => {
      dispatch({
        type: studySpaceAction.GET_ALL_GROUP,
        payload: { createdById: userId, searchKey },
      });
    }, 100);
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="sm" className="MenuMain">
        <Navbar.Brand>
          <SearchMenuPageCommon
            title="Tìm kiếm nhóm theo tiêu đề..."
            onChangeSearch={(e) => this.onChangeSearch(e)}
            search={() => this.searchGroup()}
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

export default connect()(MenuStudySpacePage);
