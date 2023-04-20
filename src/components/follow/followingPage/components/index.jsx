import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SlUserUnfollow } from "react-icons/sl";
import AddFollow from "../../common/addFollow";
import { followAction } from "../../../../store/action";
import { typeFollowPage } from "../../../../common/constant";
import moment from "moment";
import { formatDateTime } from "../../../../common/constant";

class RightFollowingPage extends Component {
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
      payload: { type: type || typeFollowPage.FOLLOWING },
    });
  }

  render() {
    const { followList = [] } = this.props;

    return (
      <>
        <AddFollow />
        <Row>
          {followList.map((follow) => {
            return (
              <Col className="col-4">
                <Card className="CardFollowPage">
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src={
                        follow?.userFollowed?.avatar || "/image/icon-login.png"
                      }
                      className="ImgAvatarFollow"
                    />
                    <Card.Title className="FollowName">
                      <Link>{`${follow?.userFollowed?.lastName || ""} ${
                        follow?.userFollowed?.middleName || ""
                      } ${follow?.userFollowed?.firstName || ""}`}</Link>
                    </Card.Title>
                    <Card.Subtitle className="FollowTime">
                      Follow at:{" "}
                      {moment(follow?.createdAt).format(formatDateTime)}
                    </Card.Subtitle>
                    <hr />
                    <Button size="sm" variant="outline-danger">
                      <SlUserUnfollow /> Cancle follow
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
export default connect(mapStateToProps)(RightFollowingPage);
