import React from "react";
import { connect } from "react-redux";
import MenuPersonelPage from "../menuPage/menuPersonel/index";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../commons/footer";
import LeftPersonel from "./leftPersonel/index";
import RightPersonel from "./rightPersonel/index";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

const PersonelPage = () => {
  const location = useLocation();
  const userId = location?.state?.userId;

  return (
    <>
      <MenuPersonelPage userId={userId} />
      <Container>
        <Row>
          <Col xs lg="4">
            <LeftPersonel userId={userId} />
          </Col>
          <Col>
            <RightPersonel userId={userId} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default connect()(PersonelPage);
