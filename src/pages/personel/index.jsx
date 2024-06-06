import React from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../commons/footer";
import LeftPersonel from "./left-content/index";
import RightPersonel from "./right-content/index";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthService from "../../services/auth.service";
import { postAction } from "../../store/action.store";
import MenuMain from "../menu";

const PersonelPage = () => {
  const location = useLocation();
  const userId = location?.state?.userId;
  const currentUser = AuthService.getCurrentUser();

  return (
    <>
      <MenuMain
        actionType={postAction.GET_ALL_POST_PERSONEL}
        payload={{ userId: userId ?? currentUser?.id }}
        title="Tìm kiếm bài đăng theo tiêu đề..."
      />
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
