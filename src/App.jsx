import React, { Component } from 'react';
import logo from './logo.svg';
import Red from './red.png';
import Blue from './blue.png';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cookie: null, count: null, ball: null };
  }

  componentWillMount() {
    if (!document.cookie) {
      let ball = Math.floor(Math.random() * 2);
      this.generateCookie();
      let cookie = document.cookie.split("=");
      let usr = cookie[1];
      let count = 1;
      let newState = {cookie: usr, count: count, ball: ball};
      this.setState(newState);
      this.saveUser(newState);
    } else {
      let that = this;
      let cookie = this.getCookie(document.cookie);
      this.updateUser(cookie);
      setTimeout(function(){ that.getUser(cookie); }, 100);
    }
  }

  generateCookie() {
    let num = Math.floor(Math.random() * 10000);
    let timeStamp = new Date();
    document.cookie = (`cookie=${num}${timeStamp.getTime()}`);

  }

  getCookie(cookie) {
    let arr = cookie.split("=");
    return arr[1].split(";")[0];
  }

  saveUser(user) {
    $.ajax({
      method: 'POST',
      url: 'api/users',
      data: {user},
      dataType: 'json'
    });
  }

  getUser(cookie) {
    let that = this;
    $.ajax({
      url: `api/users/${cookie}`,
      type: "GET",
      dataType: "json",
      success: function(data){
      that.setState({cookie: data.cookie, count: data.count, ball:data.ball});
      }
    });
  }

  updateUser(cookie) {
    $.ajax({
      method: "PATCH",
      url: `api/users/${cookie}`,
      dataType: "json"
    });
  }


  render() {
    if (!document.cookie || this.state.cookie === null) {
      return null;
    }
    if (this.state.ball === 1) {
      return (
        <div id="layout-content" className="layout-content-wrapper">
          <div className="ball"><img src="/assets/red.png" /></div>
          <div className="tally">Current cookie's Red circle count: {this.state.count}</div>
        </div>
      );
    } else {
      return (
        <div id="layout-content" className="layout-content-wrapper">
          <div className="ball"><img src="/assets/blue.png" /></div>
          <div className="tally">Current cookie's Blue circle count: {this.state.count}</div>
        </div>
      );
    }
  }
}

export default App;
