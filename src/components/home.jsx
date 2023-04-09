import React, { Component } from "react";
import MenuMain from "./menuMain";
import Footer from "./footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostService from "../services/postService";
import moment from "moment/moment";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      limit: 10,
      postLists: [],
      total: 0,
    };
  }

  componentDidMount() {
    this.fetchAllPosts(1);
  }

  async fetchAllPosts() {
    const { limit, page } = this.state;
    const response = await PostService.getAllPosts(page, limit);
    this.setState({
      postLists: response?.results || [],
      total: response?.total || 0,
    });
  }

  render() {
    const { postLists = [] } = this.state;
    console.log(postLists);

    return (
      <>
        <MenuMain />
        <Row>
          <Col xs lg="4">
            <div className="leftMenu">
              <h4>left menu home page</h4>
              <p>some design such as search, user list online...</p>
            </div>
          </Col>
          <Col>
            {postLists.map((post) => {
              return (
                <div className="PostItem">
                  <span>
                    <img
                      src={post?.user?.avatar || "/image/icon-login.png"}
                      alt={post?.user?.firstName}
                      className="PostAvatar"
                    />
                    <h5>
                      {`${post?.user?.lastName} ${post?.user?.middleName} ${post?.user?.firstName}`}
                      <p>
                        {moment(post.createdAt).format("YYYY-MM-DD hh:mm:ss")}
                      </p>
                    </h5>
                  </span>
                  <p className="TitlePost">{post?.title || ""}</p>
                  <p>{post.content}</p>
                  <p>
                    {post?.attachments?.map((image) => {
                      return (
                        <>
                          <img
                            src={image?.url}
                            alt={image?.originalname}
                            height="200px"
                            width="250px"
                          />
                        </>
                      );
                    })}
                  </p>
                  <hr />
                </div>
              );
            })}
          </Col>
        </Row>
        <Footer />
      </>
    );
  }
}
