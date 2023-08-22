import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

class PaginationPage extends Component {
  render() {
    const { page = 0, totalPage = 0 } = this.props;

    return (
      <>
        {totalPage >= 1 ? (
          <Card className="mb-3 text-center border-0">
            <Card.Body>
              <Button
                variant="outline-primary"
                onClick={() => this.props.goToBackPage()}
                size="sm"
              >
                <BsChevronDoubleLeft />
              </Button>{" "}
              <span>
                Tổng số: {totalPage}, Trang hiện tại: {page}{" "}
              </span>
              <Button
                variant="outline-primary"
                onClick={() => this.props.goToNextPage(totalPage)}
                size="sm"
              >
                <BsChevronDoubleRight />
              </Button>
            </Card.Body>
          </Card>
        ) : null}
      </>
    );
  }
}

export default PaginationPage;
