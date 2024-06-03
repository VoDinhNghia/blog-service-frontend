import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "./index.css";
import { typeModal } from "../../../common/constant";

class ModalCommon extends Component {
  render() {
    const {
      isShowModal = false,
      onClose,
      titleHeader = "",
      content,
      onAction,
      isShowHeader = true,
      isShowFooter = true,
      size = null,
      actionType = "",
    } = this.props;
    return (
      <Modal show={isShowModal} onHide={() => onClose()} size={size}>
        {isShowHeader ? (
          <Modal.Header closeButton={true} className="HeaderModalCommon">
            <Modal.Title className="TitleModalCommon">
              {titleHeader}
            </Modal.Title>
          </Modal.Header>
        ) : null}
        <Modal.Body>
          {content}
          {actionType === typeModal.DELETE ? (
            <>
              <Button
                variant="danger"
                className="BtnCancleModalCommon"
                onClick={() => onClose()}
              >
                Hủy
              </Button>
              <Button onClick={() => onAction()}>Đồng ý</Button>
            </>
          ) : null}
        </Modal.Body>
        {isShowFooter ? (
          <Modal.Footer>
            <Button onClick={() => onAction()}>Lưu</Button>
          </Modal.Footer>
        ) : null}
      </Modal>
    );
  }
}

export default ModalCommon;
