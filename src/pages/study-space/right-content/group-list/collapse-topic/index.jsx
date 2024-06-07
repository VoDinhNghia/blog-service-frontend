import { Component } from "react";
import { Link } from "react-router-dom";
import { Collapse, Row, Col, Card, Button } from "react-bootstrap";
import { routes, typeModal } from "../../../../../constants/constant";
import { sliceString } from "../../../../../utils/util";
import ModalCommon from "../../../../commons/modal";
import { BsFillTrashFill, BsPlusCircle } from "react-icons/bs";
import { FcViewDetails } from "react-icons/fc";

class GroupCollapseTopic extends Component {
  render() {
    const {
      group = {},
      openedTopicGroupId = "",
      isShowModalDeleteTopic = false,
      currentUser = {},
      showModalNewTopic,
      deleteTopic,
      closeModal,
      showModalDeleteTopic,
    } = this.props;
    return (
      <Collapse in={openedTopicGroupId === group?.id}>
        <div>
          <hr />
          <Row>
            {group?.topics?.map((topic) => {
              const contentModal = (
                <p>
                  Bạn có chắc chắn muốn xóa chủ đề này "<b>{topic?.name}</b>"?
                </p>
              );
              return (
                <Col className="col-6" key={topic?.id}>
                  <Card className="flex-fill CardItemTopic" key={topic?.id}>
                    <Card.Body>
                      <Card.Title>
                        <Link
                          to={routes.STUDY_SPACE_TOPIC}
                          state={{ topicId: topic?.id }}
                          style={{ color: "#283035" }}
                        >
                          {sliceString(topic?.name, 20)}
                        </Link>
                      </Card.Title>
                      <Card.Text>
                        {sliceString(topic?.description, 30)}
                      </Card.Text>
                      <Button
                        variant="light"
                        className="BtnDeleteCardItemTopic"
                        size="sm"
                        onClick={() => showModalDeleteTopic()}
                        disabled={
                          topic?.createdById === currentUser?.id ? false : true
                        }
                      >
                        <BsFillTrashFill /> Xóa
                      </Button>
                      <Button
                        variant="light"
                        className="BtnViewDetailCardItem"
                        size="sm"
                      >
                        <Link
                          to={routes.STUDY_SPACE_TOPIC}
                          state={{ topicId: topic?.id }}
                        >
                          <FcViewDetails /> Xem
                        </Link>
                      </Button>
                      <ModalCommon
                        isShowModal={isShowModalDeleteTopic}
                        onClose={() =>
                          closeModal({
                            isShowModalDeleteTopic: false,
                          })
                        }
                        content={contentModal}
                        isShowHeader={false}
                        isShowFooter={false}
                        onAction={() => deleteTopic(topic?.id)}
                        actionType={typeModal.DELETE}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <hr />
          {currentUser?.id === group?.createdById ||
          group?.members?.find((mem) => mem?.memberId === currentUser?.id) ? (
            <Button
              variant="outline-primary"
              onClick={() => showModalNewTopic(group?.id)}
            >
              <BsPlusCircle /> Thêm chủ đề
            </Button>
          ) : null}
        </div>
      </Collapse>
    );
  }
}

export default GroupCollapseTopic;
