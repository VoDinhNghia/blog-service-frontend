import React, { Component } from "react";
import { connect } from "react-redux";
import { BsChatQuote, BsSearch } from "react-icons/bs";
import { Button, Form, InputGroup } from "react-bootstrap";
import InfoUserPanel from "../../../commons/user-info";
import AuthService from "../../../../services/auth.service";
import "./index.css";
import { messageAction, userAction } from "../../../../store/action.store";
import { Link } from "react-router-dom";
import { routes } from "../../../../constants/constant";
import MessageModal from "../messageModal";
import { getAllMessByOneConver } from "../../../../services/message.service";
import { filterStatusLoginUser } from "../../../../utils/home.util";
import { getUserName } from "../../../../utils/util";

class LeftHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      isShowModalMessage: false,
      userInfo: {},
      limit: 10,
      page: 1,
      messages: [],
    };
    this.dispatch = this.props.dispatch;
  }

  onChangeValue(event) {
    this.setState({
      searchKey: event.target.value,
    });
    this.dispatch({
      type: userAction.GET_ALL_USER,
      payload: { searchKey: event.target.value },
    });
  }

  onSearch() {
    const { searchKey } = this.state;
    this.dispatch({ type: userAction.GET_ALL_USER, payload: { searchKey } });
  }

  showModalMessage(userInfo) {
    this.setState({
      isShowModalMessage: true,
      userInfo,
    });
    setTimeout(() => {
      this.fetchMessAndConversation(userInfo);
    }, 50);
  }

  closeModalMessage(value) {
    this.setState({
      isShowModalMessage: value,
      messages: [],
    });
  }

  fetchMessAndConversation(userInfo) {
    this.dispatch({
      type: messageAction.GET_ONE_CONVERSATION,
      chatWithId: userInfo?.id,
    });
    this.fetchMessage(userInfo);
  }

  async fetchMessage(userInfo) {
    const messages = await getAllMessByOneConver({
      chatWithId: userInfo?.id,
    });
    this.setState({
      messages,
    });
  }

  render() {
    const { userList = [] } = this.props;
    const {
      isShowModalMessage,
      userInfo = {},
      messages = [],
      searchKey,
    } = this.state;
    const currentUser = AuthService.getCurrentUser();
    const userOnlineList = filterStatusLoginUser(userList, searchKey);

    return (
      <>
        <div className="LeftMenuHomePage">
          <InfoUserPanel data={currentUser} />
          <InputGroup className="AddFollow">
            <Form.Control
              placeholder="Tìm kiếm người dùng..."
              onChange={(event) => this.onChangeValue(event)}
              className="SelectUserAddFollow"
            />{" "}
            <Button
              variant="outline-primary"
              className="BtnAddFollow"
              onClick={() => this.onSearch()}
            >
              <BsSearch />
            </Button>
          </InputGroup>
          <div className="ListFriendMajorLeftHomePage">
            {userOnlineList.map((user) => {
              return (
                <p key={user?.id}>
                  <span>
                    <img
                      src={user?.avatar || "/image/icon-login.png"}
                      alt=""
                      className="FriendMajorAvatar"
                    />
                    <span className="badge">
                      {user?.statusLogin ? (
                        <img
                          src="/image/green-status.jpg"
                          alt=""
                          className="StatusLoginIcon"
                        />
                      ) : (
                        <img
                          src="/image/red-status.png"
                          alt=""
                          className="StatusLoginIcon"
                        />
                      )}
                    </span>
                    <Link to={routes.PERSONEL} state={{ userId: user?.id }}>
                      {getUserName(user)}
                    </Link>{" "}
                    <Button
                      className="BtnMessageLeftMenuHome"
                      variant="light"
                      onClick={() => this.showModalMessage(user)}
                    >
                      <BsChatQuote />
                    </Button>
                  </span>
                </p>
              );
            })}
          </div>
          <MessageModal
            isShowModalMessage={isShowModalMessage}
            closeModalMessage={(value) => this.closeModalMessage(value)}
            userInfo={userInfo}
            messages={messages}
          />
        </div>
      </>
    );
  }
}

export default connect()(LeftHomePage);
