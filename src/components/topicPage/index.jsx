import React from "react";
import MenuStudySpacePage from "../menuPage/menuStudySpace/index";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../footerPage/footer";
import LeftTopicPage from "./leftTopic";
import RightTopicPage from "./rightTopic";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

const TopicPage = () => {
  const location = useLocation();
  const { userId, topicId } = location?.state;

  return (
    <>
      <MenuStudySpacePage userId={userId} />
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
