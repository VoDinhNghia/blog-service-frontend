import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { BsSearch } from "react-icons/bs";
import { connect } from "react-redux";
import { postAction } from "../../../../store/action";
import "./index.css";

class LeftHomePage extends Component {
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
        this.searchPost()
    }
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
      <>
        <InputGroup className="SearchLeftHomePage">
          <Form.Control
            placeholder="search post by title..."
            aria-label="search post"
            aria-describedby="basic-addon-search-home-page"
            onChange={(event) => this.onChangeSearch(event)}
          />
          <Button
            id="basic-addon-search-home-page"
            variant="light"
            onClick={() => this.searchPost()}
          >
            <BsSearch />
          </Button>
        </InputGroup>
        <div className="leftMenu">
          <h4>left menu home page</h4>
          <p>some design such as search, user list online...</p>
        </div>
      </>
    );
  }
}

export default connect()(LeftHomePage);
