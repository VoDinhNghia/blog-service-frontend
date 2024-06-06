import React from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../../commons/footer";
import LeftPersonel from "../../personelPage/leftPersonel";
import { useLocation } from "react-router-dom";
import RightFollowPage from "./components";
import { Container } from "react-bootstrap";
import MenuMain from "../../menu";
import { postAction  } from "../../../store/action.store";
import AuthService from "../../../services/auth.service";

const FollowedPage = () => {
  const location = useLocation();
  const { userId, type } = location?.state;
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
            <RightFollowPage userId={userId} type={type} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default connect()(FollowedPage);
