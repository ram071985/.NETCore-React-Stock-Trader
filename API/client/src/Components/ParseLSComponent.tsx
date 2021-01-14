import React, { Component } from "react";

class ParseLSComponent extends Component {

  parseLocalStorage = async () => {
    let parseUserId: number = parseInt(localStorage.getItem("user_id") as string);
    return parseUserId;
  }
}

export default ParseLSComponent;