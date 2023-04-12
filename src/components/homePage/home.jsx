import React, { Component } from "react";
import MenuMain from "../menuPage/menuMain";
import Footer from "../footerPage/footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RightHomePage from "./components/rightPage/rightPage";
import LeftHomePage from "./components/leftPage/leftPage";

class Home extends Component {
  render() {
    return (
      <>
        <MenuMain />
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
