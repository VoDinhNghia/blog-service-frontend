import React, { Component } from "react";
import MenuMain from "./menuMain";
import Footer from "./footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment/moment";
import { connect } from "react-redux";
import { postAction } from "../store/action";
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      limit: 10,
    };
  }

  componentDidMount() {
    this.fetchAllPosts();
  }

  async fetchAllPosts() {
    const { limit, page } = this.state;
    const { dispatch } = this.props;
    dispatch({ type: postAction.GET_ALL_POST, payload: { page, limit: limit } });
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
    const { postLists = [] } = this.props;
    const { page } = this.state;

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
                          <img
                            src={image?.url || ''}
                            alt={image?.originalname || ''}
                            height="200px"
                            width="250px"
                          />
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
  return { postLists: state.PostReducer.postLists }
}

export default connect(mapStateToProps)(Home)
