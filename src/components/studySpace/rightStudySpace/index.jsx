import React, { Component } from "react";
import NewGroup from "./newGroup";
import { connect } from "react-redux";
import "./index.css";
import { studySpaceAction } from "../../../store/action";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import GroupListPage from "./groupList";

class RightStudySpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchAllGroups();
  }

  fetchAllGroups() {
    const { dispatch, userId } = this.props;
    const { limit, page } = this.state;
    dispatch({
      type: studySpaceAction.GET_ALL_GROUP,
      payload: { limit, page, createdById: userId },
    });
  }

  render() {
    const { groupList = [] } = this.props;
    const { page, limit } = this.state;
    return (
      <>
        <NewGroup fetchAllGroups={() => this.fetchAllGroups()} />
        <GroupListPage groupList={groupList} page={page} limit={limit} />
        {
          <button className="ButtonBack" onClick={() => this.goToBackPage()}>
            <BsChevronDoubleLeft /> back
          </button>
        }{" "}
        <button className="BtnNumberPage">current: {1}</button>
        <button className="BtnTotalPage">
          total: 1
        </button>
        <button className="ButtonNext" onClick={() => this.goToNextPage()}>
          next <BsChevronDoubleRight />
        </button>
        <br />
        <br />
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
