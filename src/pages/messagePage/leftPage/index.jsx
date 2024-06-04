import React, { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";

class MessageLeftPage extends Component {
  render() {
    const { messageNotRead = [] } = this.props;
    const currentUser = AuthService.getCurrentUser();

    return (
      <div className="bg-light p-1 mb-2">
        {messageNotRead?.map((conver) => {
          return (
            <p className="m-3" key={conver?.id}>
              <img
                src="/image/icon-login.png"
                className="IconUserMessage"
                alt=""
              />
              <Link onClick={() => this.props.goToConversation(conver)}>
                {conver?.user?.id === currentUser?.id
                  ? `${conver?.chatWith?.lastName} ${conver?.chatWith?.middleName} ${conver?.chatWith?.firstName}`
                  : `${conver?.user?.lastName} ${conver?.user?.middleName} ${conver?.user?.firstName}`}
              </Link>
            </p>
          );
        })}
      </div>
    );
  }
}

export default MessageLeftPage;
