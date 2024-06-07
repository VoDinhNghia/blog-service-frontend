import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import Table from "react-bootstrap/Table";
import { routes } from "../../../../../constants/constant";
import { Button } from "react-bootstrap";
import { BsFillTrashFill, BsPersonAdd } from "react-icons/bs";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import { Multiselect } from "multiselect-react-dropdown";
import { Link } from "react-router-dom";
import { studySpaceAction } from "../../../../../store/action.store";
import { optionMultiUserStudySpace } from "../../../../../utils/user.util";
import { getUserName, showDateTime } from "../../../../../utils/util";
import ModalCommon from "../../../../commons/modal";

class MemberGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedCollapse: false,
      members: [],
    };
    this.dispatch = this.props.dispatch;
    this.groupInfo = this.props.groupInfo;
  }

  showCollapse() {
    const { openedCollapse } = this.state;
    this.setState({
      openedCollapse: !openedCollapse,
    });
  }

  onSelectValue(values) {
    const membersIds = values.map((member) => {
      return member?.id;
    });
    this.setState({
      members: membersIds,
    });
  }

  addMemberIntoGroup() {
    const { members } = this.state;
    this.dispatch({
      type: studySpaceAction.ADD_NEW_MEMBER,
      id: this.groupInfo?.id,
      payload: { members },
    });
    this.props.fetchAllGroups();
  }

  deleteMember(memberId) {
    this.dispatch({ type: studySpaceAction.DELETE_MEMBER, id: memberId });
    this.props.fetchAllGroups();
  }

  render() {
    const {
      groupInfo = {},
      userList = [],
      isShowModalMember,
      permission,
    } = this.props;
    const { openedCollapse } = this.state;
    const memberList = groupInfo?.members || [];
    const userOptions = optionMultiUserStudySpace(userList);
    const content = (
      <>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>join date</th>
              {permission ? <th>action</th> : null}
            </tr>
          </thead>
          <tbody>
            {memberList?.map((member, index) => {
              return (
                <tr key={member?.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link
                      to={routes.PERSONEL}
                      state={{ userId: member?.member?.id }}
                    >
                      {getUserName(member?.member)}
                    </Link>
                  </td>
                  <td>{showDateTime(member?.createdAt)}</td>
                  {permission ? (
                    <td>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => this.deleteMember(member?.id)}
                      >
                        <BsFillTrashFill className="IconDeleteMember" />
                      </Button>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </Table>
        {permission ? (
          <>
            <Button
              variant="outline-primary"
              aria-expanded={openedCollapse}
              onClick={() => this.showCollapse()}
            >
              <BsPersonAdd />
            </Button>
            <Collapse in={openedCollapse}>
              <div>
                <Form.Label>Chọn thành viên mới</Form.Label>
                <Multiselect
                  options={userOptions}
                  onSelect={(value) => this.onSelectValue(value)}
                  onRemove={this.onRemove}
                  displayValue="name"
                />{" "}
                <br />
                <Button
                  className="BtnAddNewMembers"
                  onClick={() => this.addMemberIntoGroup()}
                >
                  Thêm thành viên
                </Button>
              </div>
            </Collapse>
          </>
        ) : null}
      </>
    );

    return (
      <ModalCommon
        isShowModal={isShowModalMember}
        onClose={() => this.props.closeModal({ isShowModalMember: false })}
        size="lg"
        isShowFooter={false}
        content={content}
        titleHeader="Danh sách thành viên của nhóm"
      />
    );
  }
}

export default connect((state) => {
  return {
    userList: state.UserReducer.userList,
  };
})(MemberGroup);
