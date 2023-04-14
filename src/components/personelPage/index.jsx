import React, { Component } from "react";
import { connect } from "react-redux";
import MenuPersonelPage from "../menuPage/menuPersonel/index";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../footerPage/footer";
import LeftPersonel from "./leftPersonel/index";
import RightPersonel from "./rightPersonel/index";

class PersonelPage extends Component {
  render() {
    return (
      <>
        <MenuPersonelPage />
        <Row>
          <Col xs lg="4">
            <LeftPersonel />
          </Col>
          <Col>
            <RightPersonel />
          </Col>
        </Row>
        <Footer />
      </>
    );
  }
}

export default connect()(PersonelPage);
