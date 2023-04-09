import React, { Component } from "react";
import MenuMain from './menuMain';
import Footer from "./footer";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "hello",
    };
  }

  handleSearch(value) {
    console.log(value);
  }

  render() {
    return (
      <>
        <MenuMain />
        <div className="Hompage">
          <h4>Home page</h4>
          <p>....</p>
        </div>
        <Footer />
      </>
    );
  }
}
