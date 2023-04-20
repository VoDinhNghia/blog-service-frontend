import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import { InputGroup, Button } from "react-bootstrap";
import Select from "react-select";
import { SlUserFollow } from "react-icons/sl";
import { userAction } from "../../../../store/action";

class AddFollow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFollowed: "",
    };
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  onSelectValue(values) {
    this.setState({
      userFollowed: values?.value,
    });
  }

  fetchAllUsers() {
    const { dispatch } = this.props;
    dispatch({ type: userAction.GET_ALL_USER });
  }

  render() {
    const { userList = [] } = this.props;
    const options = userList.map((user) => {
      return {
        label: `${user?.lastName || ""} ${user?.middleName || ""} ${
          user?.firstName || ""
        } - ${user?.code}`,
        value: user?.id,
      };
    });
    return (
      <InputGroup className="AddFollow">
        <Select
          options={options}
          onChange={(value) => this.onSelectValue(value)}
          className="SelectUserAddFollow"
        />{" "}
        <Button variant="outline-primary" className="BtnAddFollow">
          <SlUserFollow /> Add Follow
        </Button>
      </InputGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    userList: state.UserReducer.userList,
  };
}
export default connect(mapStateToProps)(AddFollow);
