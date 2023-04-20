import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import { InputGroup, Button } from "react-bootstrap";
import Select from "react-select";
import { SlUserFollow } from "react-icons/sl";
import { followAction, userAction } from "../../../../store/action";
import { typeFollowPage } from "../../../../common/constant";

class AddFollow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFollowedId: "",
    };
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  onSelectValue(values) {
    this.setState({
      userFollowedId: values?.value,
    });
  }

  fetchAllUsers() {
    const { dispatch } = this.props;
    dispatch({ type: userAction.GET_ALL_USER });
  }

  addFollow() {
    const { dispatch } = this.props;
    const { userFollowedId } = this.state;
    dispatch({ type: followAction.ADD_FOLLOW, payload: { userFollowedId } });
    setTimeout(() => {
      dispatch({
        type: followAction.GET_LIST_FOLLOW,
        payload: { type: typeFollowPage.FOLLOWING },
      });
    }, 100);
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
          placeholder="search user..."
          onChange={(value) => this.onSelectValue(value)}
          className="SelectUserAddFollow"
        />{" "}
        <Button
          variant="outline-primary"
          className="BtnAddFollow"
          onClick={() => this.addFollow()}
        >
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
