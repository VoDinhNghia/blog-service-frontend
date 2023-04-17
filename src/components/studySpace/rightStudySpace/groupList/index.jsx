import React, { Component } from "react";
import "./index.css";
import Card from "react-bootstrap/Card";
import moment from "moment/moment";
import { formatDateTime } from "../../../../common/constant";
import { Button } from "react-bootstrap";

class GroupListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { groupList = [] } = this.props;
    return (
      <div>
        {groupList.map((group) => {
          return (
            <Card className="RightStudySpace">
              <Card.Body>
                <Card.Title>{group?.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted TimeRightStudySpace">
                  {moment(group?.createdAt || "").format(formatDateTime)}
                </Card.Subtitle>
                <Card.Text>
                  {group?.description}
                </Card.Text>
                <Button className="BtnRightStudySpace">Members</Button> 
                <Button className="BtnRightStudySpace">Topics</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default GroupListPage;
