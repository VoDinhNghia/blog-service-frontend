import React, { Component } from "react";
import MenuMain from "./menuMain";
import Footer from "./footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getAllPosts } from "../services/postService";
import moment from "moment/moment";
import { connect } from "react-redux"
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      limit: 1,
      postLists: [],
      total: 0,
    };
  }

  componentDidMount() {
    this.fetchAllPosts();
  }

  async fetchAllPosts() {
    const { limit, page } = this.state;
    const { dispatch } = this.props;
    dispatch({ type: 'GET_ALL_POST' })
    const response = await getAllPosts(page, limit);
    this.setState({
      postLists: response?.results || [],
      total: response?.total || 0,
    });
  }

  async gotoNextPage() {
    const { page } = this.state;
    this.setState({
      page: page + 1,
    })
    await this.fetchAllPosts();
  }

  async gotoBack() {
    const { page } = this.state;
    this.setState({
      page: page - 1,
    })
    await this.fetchAllPosts();
  }

  render() {
    const { postListTest } = this.props;
    const { postLists = [], page } = this.state;
    console.log('postListTets', postListTest);

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
            {postLists?.map((post) => {
              return (
                <div className="PostItem" key={post?.id}>
                  <span>
                    <img
                      src={post?.user?.avatar || "/image/icon-login.png"}
                      alt={post?.user?.firstName}
                      className="PostAvatar"
                    />
                    <h5>
                      {`${post?.user?.lastName || ''} ${post?.user?.middleName || ''} ${post?.user?.firstName || ''}`}
                      <p>
                        {post?.createdAt ? moment(post?.createdAt).format("YYYY-MM-DD hh:mm:ss") : ''}
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
                            src={image?.url || ''}
                            alt={image?.originalname || ''}
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
            {page > 1 ? <button onClick={() => this.gotoBack()}>back</button> : ''} <button onClick={() => this.gotoNextPage()}>next</button>
          </Col>
        </Row>
        <Footer />
      </>
    );
  }
}

function mapStateToProps(state) {
  return { postListTest: state.PostReducer.postListTest }
}

export default connect(mapStateToProps)(Home)
