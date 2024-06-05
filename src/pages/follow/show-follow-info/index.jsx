import { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import { routes, typeFollowPage } from "../../../constants/constant";
import { getUserName, showDateTime } from "../../../utils/util";
import "./index.css";

class ShowFollowInfo extends Component {
  render() {
    const { followList = [], type = "", onAction } = this.props;

    return (
      <Row>
        {followList.map((follow) => {
          const userInfo =
            type === typeFollowPage.FOLLOWED
              ? follow?.userFollow
              : follow?.userFollowed;
          const avatar = userInfo?.avatar || userInfo?.avatar;
          const userId = userInfo?.id || userInfo?.id;

          return (
            <Col xl={4} key={follow?.id}>
              <Card className="CardFollowPage">
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={avatar || "/image/icon-login.png"}
                    className="ImgAvatarFollow"
                  />
                  <Card.Title className="FollowName text-center">
                    <Link to={{ pathname: routes.PERSONEL }} state={{ userId }}>
                      {getUserName(userInfo)}
                    </Link>
                  </Card.Title>
                  <Card.Subtitle className="FollowTime text-center">
                    {type === typeFollowPage.FOLLOWED
                      ? "Theo dõi bạn vào lúc"
                      : "Bạn theo dõi vào lúc"}
                    : {showDateTime(follow?.createdAt)}
                  </Card.Subtitle>
                  <hr />
                  {type === typeFollowPage.FOLLOWED ? (
                    <Button
                      className="BtnFollow w-100"
                      size="sm"
                      variant="outline-primary"
                      onClick={() => onAction(userId)}
                    >
                      <SlUserFollow /> Theo dõi
                    </Button>
                  ) : null}
                  {type === typeFollowPage.FOLLOWING ? (
                    <Button
                      className="w-100"
                      size="sm"
                      variant="outline-danger"
                      onClick={() => onAction(follow?.id)}
                    >
                      <SlUserUnfollow /> Hủy theo dõi
                    </Button>
                  ) : null}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default ShowFollowInfo;
