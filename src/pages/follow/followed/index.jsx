import React from "react";
import { connect } from "react-redux";
import MenuPersonelPage from "../../menu/personel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../../commons/footer";
import LeftPersonel from "../../personelPage/leftPersonel";
import { useLocation } from "react-router-dom";
import RightFollowPage from "./components";
import { Container } from "react-bootstrap";

const FollowedPage = () => {
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
            <RightFollowPage userId={userId} type={type} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default connect()(FollowedPage);
