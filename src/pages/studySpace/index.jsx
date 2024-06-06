import React from "react";
import MenuStudySpacePage from "../menu/study-space";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../commons/footer";
import LeftStudySpace from "./leftStudySpace";
import RightStudySpace from "./rightStudySpace";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

const StudySpacePage = () => {
  const location = useLocation();
  const userId = location?.state?.userId;

  return (
    <>
      <MenuStudySpacePage userId={userId} />
      <Container>
        <Row>
          <Col xs lg="4">
            <LeftStudySpace userId={userId} />
          </Col>
          <Col>
            <RightStudySpace userId={userId} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default StudySpacePage;
