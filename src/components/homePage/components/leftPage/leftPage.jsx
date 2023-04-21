import React, { Component } from "react";
import { connect } from "react-redux";
import { BsChatQuote, BsSearch } from "react-icons/bs";
import { Button, Form, InputGroup } from "react-bootstrap";
import InfoUserPanel from "../../../commons/InfoUserPanel/index";
import AuthService from "../../../../services/authService";
import "./index.css";
import { userAction } from "../../../../store/action";
import { Link } from "react-router-dom";
import { routes } from "../../../../common/constant";

class LeftHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
    };
  }

  onChangeValue(event) {
    this.setState({
      searchKey: event.target.value,
    });
    const { dispatch } = this.props;
    dispatch({
      type: userAction.GET_ALL_USER,
      payload: { searchKey: event.target.value },
    });
  }

  onSearch() {
    const { dispatch } = this.props;
    const { searchKey } = this.state;
    dispatch({ type: userAction.GET_ALL_USER, payload: { searchKey } });
  }

  render() {
    const { userList = [] } = this.props;
    const currentUser = AuthService.getCurrentUser();
    return (
      <>
        <div className="LeftMenuHomePage">
          <InfoUserPanel data={currentUser} />
          <InputGroup className="AddFollow">
            <Form.Control
              placeholder="search user..."
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
            {userList?.map((user) => {
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
                    <Link to={routes.PERSONEL} state={{ userId: user?.id }}>{`${
                      user?.lastName || ""
                    } ${user?.middleName || ""} ${
                      user?.firstName || ""
                    }`}</Link>{" "}
                    <Button className="BtnMessageLeftMenuHome" variant="ligth">
                      <BsChatQuote />
                    </Button>
                  </span>
                </p>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default connect()(LeftHomePage);
