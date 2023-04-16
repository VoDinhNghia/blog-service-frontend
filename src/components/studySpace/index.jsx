import React from "react";
import MenuStudySpacePage from "../menuPage/menuStudySpace/index";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../footerPage/footer";
import LeftStudySpace from "./leftStudySpace";
import RightStudySpace from "./rightStudySpace";
import { useLocation } from 'react-router-dom';

const StudySpacePage = () => {
  const location = useLocation();
  const userId = location?.state?.userId;

    return (
      <>
        <MenuStudySpacePage userId={userId} />
        <Row>
          <Col xs lg="4">
            <LeftStudySpace userId={userId} />
          </Col>
          <Col>
            <RightStudySpace userId={userId} />
          </Col>
        </Row>
        <Footer />
      </>
    );
}

export default StudySpacePage;
