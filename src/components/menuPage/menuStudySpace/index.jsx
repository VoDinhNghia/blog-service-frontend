import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { BsSearch } from "react-icons/bs";
import "./index.css";
import { connect } from "react-redux";
import MenuMain from "../menuMain";

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
    if (key?.length > 2) {
      this.searchPost();
    }
  }

  searchPost() {
    const { dispatch } = this.props;
    const { searchKey } = this.state;
    console.log(dispatch, searchKey);
  }

  render() {
    return (
      <div className="MenuMain">
        <nav className="navbar navbar-expand">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <InputGroup className="SearchMenuBar">
                <Button
                  id="basic-addon-search-home-page"
                  variant="light"
                  onClick={() => this.searchPost()}
                >
                  <BsSearch />
                </Button>
                <Form.Control
                  placeholder="search group in study space..."
                  aria-label="search group"
                  aria-describedby="basic-addon-search-home-page"
                  onChange={(event) => this.onChangeSearch(event)}
                  className="InputSearchMenuBar"
                />
              </InputGroup>
            </li>
          </div>
          <MenuMain />
        </nav>
      </div>
    );
  }
}

export default connect()(MenuStudySpacePage);
