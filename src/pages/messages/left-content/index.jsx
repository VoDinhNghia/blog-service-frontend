import React, { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { getUserName } from "../../../utils/util";

class LeftContentMessagePage extends Component {
  render() {
    const { messageNotRead = [] } = this.props;
    const currentUser = AuthService.getCurrentUser();

    return (
      <div className="bg-light p-1 mb-2">
        {messageNotRead?.map((conver) => {
          const { user = {}, chatWith = {}, id = "" } = conver;
          return (
            <p className="m-3" key={id}>
              <img
                src="/image/icon-login.png"
                className="IconUserMessage"
                alt=""
              />
              <Link onClick={() => this.props.goToConversation(conver)}>
                {user?.id === currentUser?.id
                  ? getUserName(chatWith)
                  : getUserName(user)}
              </Link>
            </p>
          );
        })}
      </div>
    );
  }
}

export default LeftContentMessagePage;
