import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import AddFollow from "./addFollow";

class RightFollowPage extends Component {
  render() {
    return (
      <>
        <AddFollow />
        <Row>
          <Col className="col-4">
            <Card className="CardFollowPage">
              <Card.Body>
                <Card.Img variant="top" src="/image/icon-login.png" className="ImgAvatarFollow"/>
                <Card.Title className="FollowName">
                  <Link>
                    Vo Vu Nguyen Nghia
                  </Link>
                </Card.Title>
                <Card.Subtitle className="FollowTime">
                  Follow at: 2023-04-20 15:21:00
                </Card.Subtitle>
                <hr />
                <Button className="BtnFollow" size="sm" variant="outline-primary"><SlUserFollow /> Follow</Button>
                <Button size="sm" variant="outline-danger"><SlUserUnfollow /> Cancle follow</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default connect()(RightFollowPage);
