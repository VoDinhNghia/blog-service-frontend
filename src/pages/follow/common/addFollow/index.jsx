import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import { Button, Card, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { SlUserFollow } from "react-icons/sl";
import { followAction, userAction } from "../../../../store/action.store";
import { typeFollowPage } from "../../../../constants/constant";

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
      <Card className="mt-4">
        <Card.Body>
          <Row>
            <Col xl={9}>
              <Select
                options={options}
                placeholder="Tìm kiếm bạn bè..."
                onChange={(value) => this.onSelectValue(value)}
                className="ms-2 w-100"
              />
            </Col>
            <Col xl={3}>
              <Button
                variant="outline-primary"
                className=""
                onClick={() => this.addFollow()}
              >
                <SlUserFollow /> Theo dõi
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    userList: state.UserReducer.userList,
  };
}
export default connect(mapStateToProps)(AddFollow);
