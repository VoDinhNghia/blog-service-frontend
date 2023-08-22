import React, { Component } from "react";
import MenuMessagePage from "../menuPage/menuMessagePage";
import { Col, Container, Row } from "react-bootstrap";
import MessageLeftPage from "./leftPage";
import MessageRightPage from "./rightPage";
import FooterPage from "../footerPage/footer";

class MessagePage extends Component {
  render() {
    return (
      <div>
        <MenuMessagePage />
        <Container className="mt-3">
          <Row>
            <Col xl={4}>
              <MessageLeftPage />
            </Col>
            <Col xl={8}>
              <MessageRightPage />
            </Col>
          </Row>
        </Container>
        <FooterPage />
      </div>
    );
  }
}

export default MessagePage;
