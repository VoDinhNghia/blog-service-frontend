import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SlUserFollow } from "react-icons/sl";
import { followAction } from "../../../../store/action";
import { typeFollowPage } from "../../../../common/constant";
import moment from "moment";
import { formatDateTime } from "../../../../common/constant";

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
    dispatch({
      type: followAction.GET_LIST_FOLLOW,
      payload: { type: type || typeFollowPage.FOLLOWED },
    });
  }

  followUser(id) {
    const { dispatch } = this.props;
    dispatch({ type: followAction.ADD_FOLLOW, payload: { userFollowedId: id } });
    setTimeout(() => {
      this.fetchListFollow();
    }, 100);
  }

  render() {
    const { followList = [] } = this.props;

    return (
      <>
        <Row>
          {followList.map((follow) => {
            return (
              <Col className="col-4">
                <Card className="CardFollowPage">
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src={
                        follow?.userFollow?.avatar || "/image/icon-login.png"
                      }
                      className="ImgAvatarFollow"
                    />
                    <Card.Title className="FollowName">
                      <Link>{`${follow?.userFollow?.lastName || ""} ${
                        follow?.userFollow?.middleName || ""
                      } ${follow?.userFollow?.firstName || ""}`}</Link>
                    </Card.Title>
                    <Card.Subtitle className="FollowTime">
                      Follow at:{" "}
                      {moment(follow?.createdAt).format(formatDateTime)}
                    </Card.Subtitle>
                    <hr />
                    <Button
                      className="BtnFollow"
                      size="sm"
                      variant="outline-primary"
                      onClick={() => this.followUser(follow?.userFollow?.id)}
                    >
                      <SlUserFollow /> Follow
                    </Button>
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
