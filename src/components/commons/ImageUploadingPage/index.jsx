import React, { Component } from "react";
import ImageUploading from "react-images-uploading";
import { Button, Col, Row } from "react-bootstrap";
import { BsCamera2, BsTrash, BsPencilSquare } from "react-icons/bs";

class ImageUploadingPage extends Component {
  render() {
    const { images = [] } = this.props;

    return (
      <ImageUploading
        multiple
        value={images}
        onChange={(imageList) => this.props.onChangeUpload(imageList)}
        maxNumber={69}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <Button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              variant="outline-primary"
              size="sm"
            >
              <BsCamera2 /> Chọn ảnh
            </Button>
            &nbsp;
            {imageList.length > 0 ? (
              <Button
                onClick={onImageRemoveAll}
                variant="outline-danger"
                size="sm"
              >
                <BsTrash /> Xóa tất cả ảnh
              </Button>
            ) : null}
            <Row>
              {imageList.map((image, index) => (
                <Col xl={4} className="mt-2 mb-2">
                  <div key={index} className="image-item border">
                    <img
                      src={image["data_url"]}
                      alt=""
                      width="100%"
                      height="120px"
                    />
                    <div className="image-item__btn-wrapper mt-1 mb-1 text-center">
                      <Button
                        onClick={() => onImageUpdate(index)}
                        variant="outline-primary"
                        size="sm"
                      >
                        <BsPencilSquare />
                      </Button>{" "}
                      <Button
                        onClick={() => onImageRemove(index)}
                        variant="outline-danger"
                        size="sm"
                      >
                        <BsTrash />
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </ImageUploading>
    );
  }
}

export default ImageUploadingPage;
