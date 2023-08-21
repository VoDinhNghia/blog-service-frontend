import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import "./index.css";
import { Link } from "react-router-dom";
import { likeAction, routes } from "../../../../common/constant";
import { BsFillEmojiHeartEyesFill, BsFillHandThumbsUpFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";

class ModalLikeHomepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  render() {
    const { isShowModal = false, data = [], isPersonel } = this.props;
    return (
      <div>
        <Modal
          show={isShowModal}
          onHide={() => this.props.closeModal(false)}
        >
          <Modal.Header closeButton={true} className="HeaderModalHomePage">
            <Modal.Title className="TitleModalUserLike">Danh sách người dùng thích bài viết</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {data?.map((lists, index) => {
              return (
                <p className="ModalUserLike" key={`${lists?.id}${index}`}>
                  <span>
                    <img
                      src={lists?.user?.avatar || "/image/icon-login.png"}
                      alt=""
                    />
                    <Link
                      to={{
                        pathname: routes.PERSONEL,
                      }}
                      state={{ userId: lists?.user?.id }}
                      onClick={isPersonel ? () => window.location.reload() : null}
                    >{`${lists?.user?.lastName || ""} ${
                      lists?.user?.middleName || ""
                    } ${lists?.user?.firstName || ""}`}</Link>{" "}
                    (
                      {lists?.action === likeAction.LIKE ? <BsFillHandThumbsUpFill className="LikeIcon" /> : null}
                      {lists?.action === likeAction.HEART ? <AiFillHeart className="HeartIcon"/> : null}
                      {lists?.action === likeAction.LOVE ? <BsFillEmojiHeartEyesFill className="HeartEyesIcon" /> : null}
                    )
                  </span>
                </p>
              );
            })}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ModalLikeHomepage;
