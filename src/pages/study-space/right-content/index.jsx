import React, { Component } from "react";
import NewGroup from "./new-group";
import { connect } from "react-redux";
import "./index.css";
import { studySpaceAction, userAction } from "../../../store/action.store";
import PaginationPage from "../../commons/pagination";
import GroupListPage from "./group-list";
import { calCurrentPage, calToTalPage } from "../../../utils/util";

class RightStudySpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 20,
      page: 1,
    };
    this.dispatch = this.props.dispatch;
    this.userId = this.props.userId;
  }

  componentDidMount() {
    this.fetchAllGroups();
    this.fetchAllUsers();
  }

  fetchAllGroups() {
    const { limit, page } = this.state;
    this.dispatch({
      type: studySpaceAction.GET_ALL_GROUP,
      payload: { limit, page, createdById: this.userId },
    });
  }

  fetchAllUsers() {
    this.dispatch({ type: userAction.GET_ALL_USER });
  }

  goToPage(totalPage = 0, isNextPage = true) {
    const { page, limit } = this.state;
    const currentPage = calCurrentPage(page, totalPage, isNextPage);
    this.setState({
      page: currentPage,
    });
    this.dispatch({
      type: studySpaceAction.GET_ALL_GROUP,
      payload: {
        limit,
        page: currentPage,
        createdById: this.userId,
      },
    });
  }

  render() {
    const { groupList = [], userId, totalGroup = 0 } = this.props;
    const { limit, page } = this.state;
    const totalPage = calToTalPage(totalGroup, limit);

    return (
      <>
        <NewGroup fetchAllGroups={() => this.fetchAllGroups()} />
        <GroupListPage
          groupList={groupList}
          limit={limit}
          page={page}
          userId={userId}
        />
        <PaginationPage
          page={page}
          totalPage={totalPage}
          goToBackPage={() => this.goToPage(0, false)}
          goToNextPage={() => this.goToPage(totalPage, true)}
        />
      </>
    );
  }
}

export default connect((state) => {
  return {
    groupList: state.StudySpaceReducer.groupList,
    totalGroup: state.StudySpaceReducer.totalGroup,
  };
})(RightStudySpace);
