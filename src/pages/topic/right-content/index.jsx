import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import { studySpaceAction } from "../../../store/action";
import moment from "moment/moment";
import { formatDateTime, routes } from "../../../constants/constant";
import { Button } from "react-bootstrap";
import ActionTopicDetail from "./actions";
import { Link } from "react-router-dom";
import { BsFillPlusSquareFill } from "react-icons/bs";
import AuthService from "../../../services/authService";
import AddNewProblemModal from "./new-problem";
import ProblemList from "./problem";
import { getUserName } from "../../../utils/util";

class RightTopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalAddProblem: false,
    };
    this.dispatch = this.props.dispatch;
  }

  componentDidMount() {
    this.fetchTopicInfo();
  }

  fetchTopicInfo() {
    this.dispatch({
      type: studySpaceAction.GET_TOPIC_BY_ID,
      id: this.props?.topicId,
    });
  }

  showModalAddProblem() {
    this.setState({
      isShowModalAddProblem: true,
    });
  }

  closeModalAddProblem() {
    this.setState({
      isShowModalAddProblem: false,
    });
  }

  render() {
    const { topicInfo = {} } = this.props;
    const currentUser = AuthService.getCurrentUser();

    return (
      <>
        <div className="TopicDetailPage">
          <div className="TitleTopicInfo">
            <h4>
              Chủ đề: {topicInfo?.name}{" "}
              <span className="ActionTopic">
                {currentUser?.id === topicInfo?.createdBy?.id ? (
                  <ActionTopicDetail topicInfo={topicInfo} />
                ) : null}
              </span>
            </h4>
          </div>
          <div className="ContentTopicInfo">
            <p>
              <b>Được tạo bởi: </b>:{" "}
              <Link
                to={routes.PERSONEL}
                state={{ userId: topicInfo?.createdBy?.id }}
              >
                {getUserName(topicInfo?.createdBy)}
              </Link>
            </p>
            <p>
              <b>Được tạo vào lúc: </b>:{" "}
              {moment(topicInfo?.createdAt).format(formatDateTime)}
            </p>
            <p>
              <b>Mô tả: </b>: {topicInfo?.description}
            </p>
          </div>
        </div>
        <hr />
        <div className="BtnAddProblem">
          <Button
            variant="outline-primary"
            onClick={() => this.showModalAddProblem()}
          >
            <BsFillPlusSquareFill /> Thêm vấn đề
          </Button>
          <AddNewProblemModal
            isShowModalAddProblem={this.state.isShowModalAddProblem}
            closeModalAddProblem={() => this.closeModalAddProblem()}
            topicId={topicInfo?.id}
          />
        </div>
        <div>
          <ProblemList
            problemList={topicInfo?.studyProblems}
            topicId={topicInfo?.id}
          />
        </div>
      </>
    );
  }
}

export default connect((state) => {
  return {
    topicInfo: state.StudySpaceReducer.topicInfo,
  };
})(RightTopicPage);
