import React, { Component } from "react";
import MenuHomePage from "../menuPage/menuHomePage/index";
import Footer from "../footerPage/footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RightHomePage from "./components/rightPage/rightPage";
import LeftHomePage from "./components/leftPage/leftPage";
import { connect } from "react-redux";
import { userAction } from "../../store/action";
import { Container } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUserDisplay: [],
      userIdSearch: "",
      limit: 15,
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers() {
    const { dispatch } = this.props;
    const { limit, page } = this.state;
    dispatch({ type: userAction.GET_ALL_USER, payload: { limit, page } });
  }

  render() {
    const { userList = [] } = this.props;

    return (
      <>
        <MenuHomePage />
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

function mapStateToProps(state) {
  return {
    userList: state.UserReducer.userList,
  };
}
export default connect(mapStateToProps)(Home);
