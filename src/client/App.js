import React, { Component } from 'react';
import Home from './components/home';
const css = require("./app.css")

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

  }

  onSetSidebarOpen = () => {
    this.setState({sidebarOpen: true})
  }

  render() {
    return (
      <div className={css.a}>
      <Home />
      </div>
    );
  }
}
