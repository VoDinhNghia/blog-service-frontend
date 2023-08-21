import React, { Component } from "react";
import "./index.css";
import InfoUserPanel from "../../commons/InfoUserPanel/index";
import { connect } from "react-redux";
import { userAction } from "../../../store/action";
import AuthService from "../../../services/authService";
import { Link } from "react-router-dom";
import {
  BsFillBriefcaseFill,
  BsFillPersonCheckFill,
  BsFillPersonPlusFill,
  BsFillTrash3Fill,
  BsImages,
} from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import ShowImagePost from "../../commons/postListCommon/showImages";
import { routes, typeFollowPage } from "../../../common/constant";

class LeftPersonel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    const { dispatch, userId } = this.props;
    const currentUser = AuthService.getCurrentUser();
    dispatch({
      type: userAction.GET_USER_BY_ID,
      payload: { userId: userId || currentUser?.id },
    });
  }

  render() {
    const { userInfo = {}, postLists = [] } = this.props;
    const currentUser = AuthService.getCurrentUser();
    const images = [];
    postLists.forEach((item) => {
      if (item?.user?.id === currentUser?.id) {
        images.push(...item?.attachments);
      }
    });

    return (
      <div>
        <div className="LeftMenuPersonel">
          <InfoUserPanel data={userInfo} />
          {currentUser?.id === userInfo?.id ? (
            <div>
              <div className="UtilitiesPersonalPage">
                <h3 className="title">
                  <BsFillBriefcaseFill className="icon" /> Tiện ích
                </h3>
                <hr />
                <p>
                  <Link
                    to={routes.FOLLOWED}
                    state={{
                      userId: userInfo?.id,
                      type: typeFollowPage.FOLLOWED,
                    }}
                    className="LinkLeftHomePage"
                  >
                    <BsFillPersonCheckFill className="IconLeftHomePage" />
                    Danh sách người theo dõi bạn
                  </Link>
                </p>
                <p>
                  <Link
                    to={routes.FOLLOWING}
                    state={{
                      userId: userInfo?.id,
                      type: typeFollowPage.FOLLOWING,
                    }}
                    className="LinkLeftHomePage"
                  >
                    <BsFillPersonPlusFill className="IconLeftHomePage" />
                    Danh sách người bạn theo dõi
                  </Link>
                </p>
                <p>
                  <Link to={"/"} className="LinkLeftHomePage">
                    <FaShare className="IconLeftHomePage" /> Danh sách bài chia sẻ
                  </Link>
                </p>
                <p>
                  <Link to={"/"} className="LinkLeftHomePage">
                    <BsFillTrash3Fill className="IconLeftHomePage" /> Thùng rác
                  </Link>
                </p>
              </div>
              <hr />
              <div className="UtilitiesPersonalPage">
                <h3 className="title">
                  <BsImages className="icon" /> Danh sách ảnh
                </h3>
              </div>
              <div className="ImageListLefPersonel">
                <ShowImagePost
                  imageLists={images}
                  isDeleted={false}
                  page={1}
                  limit={10}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    postLists: state.PostReducer.postLists,
    userInfo: state.UserReducer.userInfo,
  };
}
export default connect(mapStateToProps)(LeftPersonel);
