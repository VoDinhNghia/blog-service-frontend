import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import { postAction } from "../../../../store/action.store";
import "./index.css";
import { typeModal } from "../../../../constants/constant";
import Select from "react-select";
import ImageUploadingPage from "../../image-uploading";
import { optionPrivateMode } from "../../../../utils/new-post.util";
import DropdownCommon from "../../../commons/dropdown";
import ModalCommon from "../../modal";

class ActionPostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "default",
      title: "",
      privateMode: false,
      content: "",
      files: null,
      isShowModal: false,
      images: [],
      isShowModalDelete: false,
    };
    this.dispatch = this.props.dispatch;
    this.postInfo = this.props.postInfo;
  }

  showModal() {
    this.setState({
      isShowModal: true,
      typeAction: typeModal.UPDATE,
    });
  }

  closeModal() {
    this.setState({
      isShowModal: false,
    });
  }

  closeModalDelete() {
    this.setState({
      isShowModalDelete: false,
    });
  }

  showModalDelete() {
    this.setState({
      isShowModalDelete: true,
    });
  }

  onChangePrivateMode(event) {
    this.setState({
      privateMode: event.target.value,
    });
  }

  onChangeTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }

  onChangeContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  onChangeFile(event) {
    const fileList = event.target.files;
    const arrays = [];
    for (const img of fileList) {
      arrays.push(img);
    }
    this.setState({ files: arrays });
  }

  async updatePost() {
    const { type, content, privateMode, title, files } = this.state;
    const formData = new FormData();
    formData.append("content", content || this.postInfo?.content);
    formData.append("type", type);
    if (files?.length > 0) {
      for (const img of files) {
        formData.append("imageFile", img);
      }
    }
    formData.append("privateMode", privateMode || this.postInfo?.privateMode);
    formData.append("title", title || this.postInfo?.title);
    this.dispatch({
      type: postAction.UPDATE_POST,
      id: this.postInfo?.id,
      payload: formData,
    });
    this.props.fetchPostList();
    this.setState({
      isShowModal: false,
      files: null,
    });
  }

  deletePost() {
    this.dispatch({
      type: postAction.DELETE_POST,
      id: this.postInfo?.id,
    });
    this.props.fetchPostList();
    this.setState({
      isShowModalDelete: false,
    });
  }

  onChangeUpload(imageList) {
    this.setState({
      files: imageList?.map((image) => {
        return image?.file;
      }),
      images: imageList,
    });
  }

  render() {
    const { postInfo = {}, currentUser = {} } = this.props;
    const { isShowModal, images, isShowModalDelete } = this.state;
    const findPrivateMode = optionPrivateMode?.find(
      (op) => op.value === postInfo?.privateMode || op?.value === false
    );
    const delBodyModal = (
      <p>
        Xin chào {currentUser?.firstName}! Bạn có chắc chắn muốn xóa bài đăng
        này: "<b>{postInfo?.title}</b>"?
      </p>
    );
    const updateBodyModal = (
      <Form encType="multipart/form-data">
        <Form.Group role="form">
          <Select
            options={optionPrivateMode}
            getOptionLabel={(e) => (
              <span>
                {e.icon} {e.label}
              </span>
            )}
            defaultValue={findPrivateMode}
            onChange={(e) => this.onChangePrivateMode(e)}
          />
          <Form.Control
            placeholder="Nhập tiêu đề bài đăng..."
            aria-label="title new post"
            defaultValue={postInfo?.title || null}
            name="title"
            className="mt-2"
            onChange={(event) => this.onChangeTitle(event)}
          />
          <Form.Control
            className="mb-2 mt-2"
            placeholder="Nhập nội dung bài đăng..."
            aria-label="type new post"
            defaultValue={postInfo?.content || null}
            as="textarea"
            rows={5}
            name="content"
            onChange={(event) => this.onChangeContent(event)}
          />{" "}
          <ImageUploadingPage
            images={images}
            onChangeUpload={(imageList) => this.onChangeUpload(imageList)}
          />
        </Form.Group>
      </Form>
    );
    return (
      <>
        <div className="OptionsHeaderPostItem">
          <DropdownCommon
            onShowModalUpdate={() => this.showModal()}
            onShowModalDelete={() => this.showModalDelete()}
          />
        </div>
        <div>
          <ModalCommon
            isShowModal={isShowModal}
            onClose={() => this.closeModal()}
            titleHeader={postInfo?.title}
            content={updateBodyModal}
            onAction={() => this.updatePost()}
          />
          <ModalCommon
            isShowModal={isShowModalDelete}
            onClose={() => this.closeModalDelete()}
            isShowHeader={false}
            isShowFooter={false}
            content={delBodyModal}
            onAction={() => this.deletePost()}
            size="sm"
            actionType={typeModal.DELETE}
          />
        </div>
      </>
    );
  }
}

export default connect()(ActionPostItem);
