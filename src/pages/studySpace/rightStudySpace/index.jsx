import React, { Component } from "react";
import NewGroup from "./newGroup";
import { connect } from "react-redux";
import "./index.css";
import { studySpaceAction, userAction } from "../../../store/action.store";
import PaginationPage from "../../commons/pagination";
import GroupListPage from "./groupList";

class RightStudySpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 20,
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchAllGroups();
    this.fetchAllUsers();
  }

  fetchAllGroups() {
    const { dispatch, userId } = this.props;
    const { limit, page } = this.state;
    dispatch({
      type: studySpaceAction.GET_ALL_GROUP,
      payload: { limit, page, createdById: userId },
    });
  }

  fetchAllUsers() {
    const { dispatch } = this.props;
    dispatch({ type: userAction.GET_ALL_USER });
  }

  goToBackPage() {
    const { dispatch, userId } = this.props;
    const { page, limit } = this.state;
    const currentPage = page > 1 ? page - 1 : 1;
    this.setState({
      page: currentPage,
    });
    dispatch({
      type: studySpaceAction.GET_ALL_GROUP,
      payload: {
        limit,
        page: currentPage,
        createdById: userId,
      },
    });
  }

  goToNextPage(totalPage) {
    const { dispatch, userId } = this.props;
    const { page, limit } = this.state;
    const currentPage = page < totalPage ? page + 1 : totalPage;
    this.setState({
      page: currentPage,
    });
    dispatch({
      type: studySpaceAction.GET_ALL_GROUP,
      payload: {
        limit,
        page: currentPage,
        createdById: userId,
      },
    });
  }

  render() {
    const { groupList = [], userId, totalGroup = 0 } = this.props;
    const { limit, page } = this.state;
    const totalPage = Math.round(totalGroup / limit + 0.45);

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
          goToBackPage={() => this.goToBackPage()}
          goToNextPage={() => this.goToNextPage(totalPage)}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    groupList: state.StudySpaceReducer.groupList,
    totalGroup: state.StudySpaceReducer.totalGroup,
  };
}
export default connect(mapStateToProps)(RightStudySpace);
