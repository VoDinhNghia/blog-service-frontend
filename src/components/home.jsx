import React, { Component } from "react";
import MenuMain from "./menuMain";
import Footer from "./footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "hello",
    };
  }

  handleSearch(value) {
    console.log(value);
  }

  render() {
    return (
      <>
        <MenuMain />
        <Row>
          <Col xs lg="4">
            <div className="leftMenu">
              <h4>Homepage</h4>
              <p>....</p>
            </div>
          </Col>
          <Col>
            <div className="PostItem">
              <span><img src="/image/icon-login.png" alt="profile-img" className="PostAvatar"/><h4>Lorem Ipsum is simply dummy text <p>2023-09-04 17:15:00</p></h4></span>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries...</p>
              <p><img src="/image/icon-login.png" alt="profile-img" height="200px"/></p>
              <hr />
            </div>
          </Col>
        </Row>
        <Footer />
      </>
    );
  }
}
