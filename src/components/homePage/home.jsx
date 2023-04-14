import React, { Component } from "react";
import MenuHomePage from "../menuPage/menuHomePage/index";
import Footer from "../footerPage/footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RightHomePage from "./components/rightPage/rightPage";
import LeftHomePage from "./components/leftPage/leftPage";

class Home extends Component {
  render() {
    return (
      <>
        <MenuHomePage />
        <Row>
          <Col xs lg="4">
            <LeftHomePage />
          </Col>
          <Col>
            <RightHomePage />
          </Col>
        </Row>
        <Footer />
      </>
    );
  }
}

export default Home;
