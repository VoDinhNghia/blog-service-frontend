import React, { Component } from "react";
import "./index.css";
import AuthService from "../../../../services/auth.service";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { createPost } from "../../../../services/post.service";
import { postAction } from "../../../../store/action.store";
import { typePostListPage } from "../../../../constants/constant";
import Select from "react-select";
import ImageUploadingPage from "../../image-uploading";
import { optionPrivateMode } from "../../../../utils/new-post.util";
import { BsCardImage, BsPencilSquare } from "react-icons/bs";
import { CiSaveUp1 } from "react-icons/ci";
import { Card } from "react-bootstrap";
import ModalCommon from "../../modal";

class NewPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "default",
      title: "",
      privateMode: false,
      content: "",
      files: null,
      isUploadImages: false,
      images: [],
    };
  }

  onChangePrivateMode(event) {
    this.setState({
      privateMode: event.value,
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

  async createNewPost(userId) {
    const { type, content, privateMode, title, files } = this.state;
    const formData = new FormData();
    formData.append("content", content);
    formData.append("type", type);
    if (files?.length > 0) {
      for (const img of files) {
        formData.append("imageFile", img);
      }
    }
    formData.append("privateMode", privateMode);
    formData.append("title", title);
    await createPost(formData);
    this.fetchPostList(userId);
    this.setState({
      files: null,
      isUploadImages: false,
      privateMode: false,
      title: null,
      content: null,
    });
    this.props.closeNewPost(false);
  }

  fetchPostList(userId) {
    const { dispatch, page, limit, typePage } = this.props;
    const isPersonel = typePostListPage.PERSONEL_PAGE === typePage;
    setTimeout(() => {
      dispatch({
        type: isPersonel
          ? postAction.GET_ALL_POST_PERSONEL
          : postAction.GET_ALL_POST,
        payload: isPersonel ? { page, limit, userId } : { page, limit },
      });
    }, 100);
  }

  UploadImageAndSubmit() {
    this.setState({
      isUploadImages: true,
    });
  }

  onCloseModal() {
    this.setState({
      files: null,
      isUploadImages: false,
    });
    this.props.closeNewPost(false);
  }

  onChangeUpload(imageList) {
    this.setState({
      files: imageList?.map((image) => {
        return image?.file;
      }),
      images: imageList,
    });
  }

  editPost() {
    this.setState({
      isUploadImages: false,
    });
  }

  render() {
    const { isShowNewPost = false } = this.props;
    const currentUser = AuthService.getCurrentUser();
    const { isUploadImages, images, privateMode, content, title } = this.state;
    const formCreatePost = (
      <>
        <Select
          className="mt-2"
          options={optionPrivateMode}
          getOptionLabel={(e) => (
            <span>
              {e.icon} {e.label}
            </span>
          )}
          defaultValue={optionPrivateMode.find(
            (op) => op.value === privateMode
          )}
          onChange={(e) => this.onChangePrivateMode(e)}
        />
        <Form.Control
          className="mt-2"
          placeholder="Nhập tiêu đề bài đăng..."
          aria-label="title new post"
          name="title"
          defaultValue={title}
          onChange={(event) => this.onChangeTitle(event)}
        />
        <Card className="mt-2">
          <Card.Body className="m-0 w-100">
            <Form.Control
              className="w-100"
              placeholder="Nhập nội dung bài đăng..."
              aria-label="type new post"
              as="textarea"
              rows={7}
              name="content"
              defaultValue={content}
              onChange={(event) => this.onChangeContent(event)}
            />
          </Card.Body>
        </Card>
        <Button
          size="sm"
          className="BtnSubmitNewPost w-100"
          variant="outline-primary"
          onClick={() => this.UploadImageAndSubmit()}
        >
          <BsCardImage /> Chọn ảnh và Đăng bài
        </Button>
      </>
    );
    const formUploadImage = (
      <>
        <ImageUploadingPage
          images={images}
          onChangeUpload={(imageList) => this.onChangeUpload(imageList)}
        />
        <br />
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => this.editPost()}
        >
          <BsPencilSquare /> Chỉnh sửa bài viết
        </Button>
        <Button
          className="BtnSubmitNewPost"
          variant="outline-primary"
          size="sm"
          onClick={() => this.createNewPost(currentUser?.id)}
        >
          <CiSaveUp1 /> Đăng bài
        </Button>
      </>
    );
    const contentModal = (
      <>
        <Form encType="multipart/form-data">
          <Form.Group role="form">
            {isUploadImages ? formUploadImage : formCreatePost}
          </Form.Group>
        </Form>
      </>
    );

    return (
      <ModalCommon
        isShowModal={isShowNewPost}
        onClose={() => this.onCloseModal()}
        content={contentModal}
        titleHeader="Đăng bài viết mới"
        isShowFooter={false}
      />
    );
  }
}

export default connect((state) => {
  return {
    typePage: state.PostReducer.typePage,
    userId: state.PostReducer.userId,
  };
})(NewPostModal);
