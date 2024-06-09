import { Component } from "react";
import { Collapse, InputGroup, Form, Button } from "react-bootstrap";
import ShowCommentHomePage from "../comments";

class CollapseCommentPost extends Component {
  render() {
    const {
      openedCommentId = "",
      post = {},
      commentPost = "",
      currentUser = {},
      onchangeValueComment,
      sendComment,
      fetchPostList,
    } = this.props;
    return (
      <Collapse in={openedCommentId === post?.id}>
        <div>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Viết bình luận..."
              aria-label="comment post"
              aria-describedby="basic-addon-comment-post"
              value={commentPost}
              onChange={(event) => onchangeValueComment(event)}
            />
            <Button
              id="basic-addon-comment-post"
              variant="outline-primary"
              onClick={(event) => sendComment(event, post?.id)}
            >
              gửi
            </Button>
          </InputGroup>
          <ShowCommentHomePage
            commentList={post?.comments || []}
            userId={currentUser?.id}
            userPost={post?.user?.id}
            fetchPostList={() => fetchPostList()}
          />
        </div>
      </Collapse>
    );
  }
}

export default CollapseCommentPost;
