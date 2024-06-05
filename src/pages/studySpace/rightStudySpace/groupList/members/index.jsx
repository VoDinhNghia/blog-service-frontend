import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { formatDateTime, routes } from "../../../../../constants/constant";
import { Button } from "react-bootstrap";
import { BsFillTrashFill, BsPersonAdd } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import { Multiselect } from "multiselect-react-dropdown";
import { Link } from "react-router-dom";
import { studySpaceAction } from "../../../../../store/action.store";

class MemberGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedCollapse: false,
      members: [],
    };
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
    const { dispatch, groupInfo } = this.props;
    const { members } = this.state;
    dispatch({ type: studySpaceAction.ADD_NEW_MEMBER, id: groupInfo?.id, payload: { members }});
    this.props.fetchAllGroups();
  }

  deleteMember(memberId) {
    const { dispatch } = this.props;
    dispatch({ type: studySpaceAction.DELETE_MEMBER, id: memberId});
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
    const userOptions = userList.map((user) => {
      return {
        name: `${user?.lastName || ""} ${user?.middleName || ""} ${
          user?.firstName || ""
        }`,
        id: user?.id,
      };
    });

    return (
      <Modal
        show={isShowModalMember}
        onHide={() => this.props.closeModal({ isShowModalMember: false })}
        size="lg"
      >
        <Modal.Header closeButton={true} className="HeaderModalMember">
          <Modal.Title className="TitlePostUpdate">
            Members group list
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                      >{`${member?.member?.lastName || ""} ${
                        member?.member?.middleName || ""
                      } ${member?.member?.firstName || ""}`}</Link>
                    </td>
                    <td>
                      {moment(member?.createdAt || "").format(formatDateTime)}
                    </td>
                    {permission ? (
                      <td>
                        <Button variant="light" size="sm" onClick={() => this.deleteMember(member?.id)}>
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
                  <Form.Label>Select members</Form.Label>
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
                    Add
                  </Button>
                </div>
              </Collapse>
            </>
          ) : null}
        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    userList: state.UserReducer.userList,
  };
}
export default connect(mapStateToProps)(MemberGroup);
