import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../commons/footer";
import LeftStudySpace from "./left-content";
import RightStudySpace from "./right-content";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import MenuMain from "../menu";
import { studySpaceAction } from "../../store/action.store";

const StudySpacePage = () => {
  const location = useLocation();
  const userId = location?.state?.userId;

  return (
    <>
      <MenuMain
        actionType={studySpaceAction.GET_ALL_GROUP}
        payload={{ createdById: userId }}
        title="Tìm kiếm nhóm theo tiêu đề..."
      />
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
