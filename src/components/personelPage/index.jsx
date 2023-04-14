import React from "react";
import { connect } from "react-redux";
import MenuPersonelPage from "../menuPage/menuPersonel/index";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../footerPage/footer";
import LeftPersonel from "./leftPersonel/index";
import RightPersonel from "./rightPersonel/index";
import { useLocation } from 'react-router-dom';

const PersonelPage = () => {
  const location = useLocation();
  const userId = location?.state?.userId;

    return (
      <>
        <MenuPersonelPage />
        <Row>
          <Col xs lg="4">
            <LeftPersonel userId={userId} />
          </Col>
          <Col>
            <RightPersonel userId={userId} />
          </Col>
        </Row>
        <Footer />
      </>
    );
}

export default connect()(PersonelPage);
