import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../commons/footer";
import LeftTopicPage from "./left-content";
import RightTopicPage from "./right-content";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import MenuMain from "../menu";
import { studySpaceAction } from "../../store/action.store";

const TopicPage = () => {
  const location = useLocation();
  const { userId, topicId } = location?.state;

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
            <LeftTopicPage userId={userId} />
          </Col>
          <Col>
            <RightTopicPage userId={userId} topicId={topicId} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default TopicPage;
