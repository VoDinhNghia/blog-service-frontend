import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import AddFollow from "./addFollow";
import { followAction } from "../../../store/action";
import { typeFollowPage } from "../../../common/constant";
import moment from "moment";
import { formatDateTime } from "../../../common/constant";

class RightFollowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchListFollow();
  }

  fetchListFollow() {
    const { dispatch, type } = this.props;
    dispatch({ type: followAction.GET_LIST_FOLLOW, payload: { type } });
  }

  render() {
    const { followList = [], type } = this.props;
    const isFollowing = type === typeFollowPage.FOLLOWING;
    const follows = followList.map((follow) => {
      return {
        id: follow?.id,
        createdAt: follow?.createdAt,
        userFollowId: follow?.userFollowId,
        userFollowedId: follow?.userFollowedId,
        userName: isFollowing
          ? `${follow?.userFollowed?.lastName || ""} ${
              follow?.userFollowed?.middleName || ""
            } ${follow?.userFollowed?.firstName || ""}`
          : `${follow?.userFollow?.lastName || ""} ${
              follow?.userFollow?.middleName || ""
            } ${follow?.userFollow?.firstName || ""}`,
        avatar: isFollowing
          ? follow?.userFollowed?.avatar
          : follow?.userFollow?.avatar,
        userId: isFollowing ? follow?.userFollowed?.id : follow?.userFollow?.id,
      };
    });

    return (
      <>
        <AddFollow />
        <Row>
          {follows.map((follow) => {
            return (
              <Col className="col-4">
                <Card className="CardFollowPage">
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src={follow?.avatar || "/image/icon-login.png"}
                      className="ImgAvatarFollow"
                    />
                    <Card.Title className="FollowName">
                      <Link>{follow?.userName}</Link>
                    </Card.Title>
                    <Card.Subtitle className="FollowTime">
                      Follow at:{" "}
                      {moment(follow?.createdAt).format(formatDateTime)}
                    </Card.Subtitle>
                    <hr />
                    {isFollowing ? (
                      <Button size="sm" variant="outline-danger">
                        <SlUserUnfollow /> Cancle follow
                      </Button>
                    ) : (
                      <Button
                        className="BtnFollow"
                        size="sm"
                        variant="outline-primary"
                      >
                        <SlUserFollow /> Follow
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    followList: state.FollowReducer.followList,
    totalFollow: state.FollowReducer.totalFollow,
  };
}
export default connect(mapStateToProps)(RightFollowPage);
