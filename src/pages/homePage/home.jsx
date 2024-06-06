import React, { Component } from "react";
import Footer from "../commons/footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RightHomePage from "./components/rightPage/rightPage";
import LeftHomePage from "./components/leftPage/leftPage";
import { connect } from "react-redux";
import { userAction, postAction } from "../../store/action.store";
import { Container } from "react-bootstrap";
import MenuMain from "../menu";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUserDisplay: [],
      userIdSearch: "",
      limit: 15,
      page: 1,
    };
    this.dispatch = this.props.dispatch;
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers() {
    const { limit, page } = this.state;
    this.dispatch({ type: userAction.GET_ALL_USER, payload: { limit, page } });
  }

  render() {
    const { userList = [] } = this.props;

    return (
      <>
        <MenuMain
          actionType={postAction.GET_ALL_POST}
          payload={{}}
          title="Tìm kiếm bài đăng theo tiêu đề..."
        />
        <Container>
          <Row>
            <Col xs lg="4">
              <LeftHomePage userList={userList} />
            </Col>
            <Col>
              <RightHomePage />
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default connect((state) => {
  return {
    userList: state.UserReducer.userList,
  };
})(Home);
