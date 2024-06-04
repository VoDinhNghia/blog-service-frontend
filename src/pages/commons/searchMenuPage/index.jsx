import React, { Component } from "react";
import "./index.css";
import { InputGroup, Button, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

class SearchMenuPageCommon extends Component {
  render() {
    const { title = "Search by ..." } = this.props;
    return (
      <InputGroup className="SearchMenuCommonPage">
        <Button
          id="basic-addon-search-home-page"
          variant="light"
          onClick={() => this.props.search()}
        >
          <BsSearch />
        </Button>
        <Form.Control
          placeholder={title}
          aria-label="search post"
          aria-describedby="basic-addon-search-home-page"
          onChange={(event) => this.props.onChangeSearch(event)}
          className="InputSearchMenuBar"
        />
      </InputGroup>
    );
  }
}

export default SearchMenuPageCommon;
