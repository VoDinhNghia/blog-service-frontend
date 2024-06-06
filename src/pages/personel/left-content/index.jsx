import React, { Component } from "react";
import "./index.css";
import InfoUserPanel from "../../commons/user-info";
import { connect } from "react-redux";
import { userAction } from "../../../store/action.store";
import AuthService from "../../../services/auth.service";
import { Link } from "react-router-dom";
import { BsFillBriefcaseFill, BsImages } from "react-icons/bs";
import ShowImagePost from "../../commons/post-list/show-image";
import {
  getImagesPesonelPage,
  utilitiesList,
} from "../../../utils/personel.util";

class LeftPersonel extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    const { userId } = this.props;
    const currentUser = AuthService.getCurrentUser();
    this.dispatch({
      type: userAction.GET_USER_BY_ID,
      payload: { userId: userId ?? currentUser?.id },
    });
  }

  render() {
    const { userInfo = {}, postLists = [] } = this.props;
    const currentUser = AuthService.getCurrentUser();
    const images = getImagesPesonelPage(postLists, currentUser?.id);
    const utilitiesLink = utilitiesList(userInfo);
    const utilitiesContent = (
      <div>
        <div className="UtilitiesPersonalPage">
          <h3 className="title">
            <BsFillBriefcaseFill className="icon" /> Tiện ích
          </h3>
          <hr />
          {utilitiesLink?.map((item) => {
            return (
              <p key={item.id}>
                <Link
                  to={item.linkTo}
                  state={item.state}
                  className="LinkLeftHomePage"
                >
                  {item.icon}
                  {item.title}
                </Link>
              </p>
            );
          })}
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
    );

    return (
      <div>
        <div className="LeftMenuPersonel">
          <InfoUserPanel data={userInfo} />
          {currentUser?.id === userInfo?.id ? utilitiesContent : ""}
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    postLists: state.PostReducer.postLists,
    userInfo: state.UserReducer.userInfo,
  };
})(LeftPersonel);
