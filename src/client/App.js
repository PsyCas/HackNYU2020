import React, { Component } from 'react';
import Iframe from 'react-iframe';
import "./app.css";

import Sidebar from "react-sidebar";

const APP_KEY = "AIzaSyB2EeKaex3mjveYtL1DrMAs-4-hl--E0l8"; //<-- lol

export default class App extends Component {
  state = { 
    username: null, 
    mode:["place", "search", "view", "directions", "streetview"],
    maps_url: `https://www.google.com/maps/embed/v1/view?key=${APP_KEY}&center=40.774809,-73.970509&zoom=13`,
    sidebarOpen: false,
  };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  onSetSidebarOpen = () => {
    this.setState({sidebarOpen: true})
  }

  render() {
    return (
      <div className = "root-app-flex-main">
        
        <Sidebar
          sidebar={<b>Sidebar content</b>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
          <button onClick={() => this.onSetSidebarOpen(true)}>
            Open sidebar
          </button>
        </Sidebar>

        <Iframe
          className = "root-map-region-flex-2"
          // frameborder="0" style="border:0"
          // src={this.state.maps_url} allowfullscreen
        >
        </Iframe>

      </div>
    );
  }
}
