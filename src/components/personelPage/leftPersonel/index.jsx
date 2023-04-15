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
      <>
        <div className="LeftMenuPersonel">
          <InfoUserPanel data={userInfo} />
          {currentUser?.id === userInfo?.id ? (
            <>
              <div className="UtilitiesPersonalPage">
                <h3 className="title">
                  <BsFillBriefcaseFill className="icon" /> Utilities Link
                </h3>
                <hr />
                <p>
                  <Link to={"/"} className="LinkLeftHomePage">
                    <BsFillPersonCheckFill className="IconLeftHomePage" />
                    List Your Followers
                  </Link>
                </p>
                <p>
                  <Link to={"/"} className="LinkLeftHomePage">
                    <BsFillPersonPlusFill className="IconLeftHomePage" />
                    List of Your Followeds
                  </Link>
                </p>
                <p>
                  <Link to={"/"} className="LinkLeftHomePage">
                    <FaShare className="IconLeftHomePage" /> Shared Post Lists
                  </Link>
                </p>
                <p>
                  <Link to={"/"} className="LinkLeftHomePage">
                    <BsFillTrash3Fill className="IconLeftHomePage" /> My Trash
                  </Link>
                </p>
              </div>
              <hr />
              <div className="UtilitiesPersonalPage">
                <h3 className="title">
                  <BsImages className="icon" /> My Pictures List
                </h3>
              </div>
              <p className="ImageListLefPersonel">
                <ShowImagePost
                  imageLists={images}
                  isDeleted={false}
                  page={1}
                  limit={10}
                />
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </>
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
