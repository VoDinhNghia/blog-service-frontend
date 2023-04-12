import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/authService";
import { BsHouseFill, BsFillArrowRightSquareFill, BsBell } from "react-icons/bs";
import EventBus from "../../common/eventBus";
import { routes } from "../../common/constant";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { BsSearch } from "react-icons/bs";
import { postAction } from "../../store/action";
import "./index.css";
import { connect } from "react-redux";

class MenuMain extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      searchKey: null,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  onChangeSearch(event) {
    const key = event.target.value;
    this.setState({
      searchKey: key,
    });
    if (key?.length > 2) {
        this.searchPost()
    }
  }

  searchPost() {
    const { dispatch } = this.props;
    const { searchKey } = this.state;
    setTimeout(() => {
      dispatch({ type: postAction.GET_ALL_POST, payload: { searchKey } });
    }, 100);
  }

  render() {
    return (
      <div className="MenuMain">
        <nav className="navbar navbar-expand">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
            <InputGroup className="SearchMenuBar">
              <Form.Control
                placeholder="search post by title..."
                aria-label="search post"
                aria-describedby="basic-addon-search-home-page"
                onChange={(event) => this.onChangeSearch(event)}
                className="InputSearchMenuBar"
              />
              <Button
                id="basic-addon-search-home-page"
                variant="light"
                onClick={() => this.searchPost()}
              >
                <BsSearch />
              </Button>
            </InputGroup>
            </li>
          </div>
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
             <Link to={routes.HOME} className="nav-link">
                <BsHouseFill /> Home
              </Link>
            </li>
            <li className="nav-item">
              <a href={'not-yet'} className="nav-link">
                <BsBell /><span className="NotifyMenu">10</span>
              </a>
            </li>
            <li className="nav-item">
              <a href={routes.LOGIN} className="nav-link" onClick={this.logOut}>
                Log out <BsFillArrowRightSquareFill />
              </a>
            </li>
          </div>
        </nav>
      </div>
    );
  }
}

export default connect()(MenuMain)
