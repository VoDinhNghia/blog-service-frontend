import React from "react";
import { connect } from "react-redux";
import MenuPersonelPage from "../../menuPage/menuPersonel/index";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../../footer";
import LeftPersonel from "../../personelPage/leftPersonel";
import { useLocation } from "react-router-dom";
import RightFollowingPage from "./components";
import { Container } from "react-bootstrap";

const FollowingPage = () => {
  const location = useLocation();
  const { userId, type } = location?.state;

  return (
    <>
      <MenuPersonelPage userId={userId} />
      <Container>
        <Row>
          <Col xs lg="4">
            <LeftPersonel userId={userId} />
          </Col>
          <Col>
            <RightFollowingPage userId={userId} type={type} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default connect()(FollowingPage);
