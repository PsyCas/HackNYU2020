import React, { Component } from "react";
import Axios from "axios";
import Switch from "./Utilities/Switch";
const css = require("./home.css");
const search_icon_image = require("./search_icon.svg");
const PROD = process.env.PRODUCTION;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_string: "",
      search_suggestions: [],
      manhattan: true,
      brooklyn: true,
      queens: true,
      bronx: true,
      staten_island: true,
      rating_a: true,
      rating_b: true,
      rating_c: true,
      rating_pending: true,
      rating_closed: true,
      loading: false,
      error: false,
      searchOpen: true,
      restaurants: [],
      searchActive: true,
      additional_show: false
    };
  }
  componentDidMount() {}

  search = () => {
    this.setState({
      loading: true
    });
    Axios.post(`${PROD ? "" : "http://localhost:8080"}/api/search`, {
      search: this.state.search_string,
      manhattan: this.state.manhattan,
      brooklyn: this.state.brooklyn,
      queens: this.state.queens,
      bronx: this.state.bronx,
      staten_island: this.state.staten_island,
      rating_a: this.state.rating_a,
      rating_b: this.state.rating_b,
      rating_c: this.state.rating_c,
      rating_pending: this.state.rating_pending,
      rating_closed: this.state.rating_closed
    })
      .then(res => {
        this.setState({
          loading: false,
          restaurants: res.data,
          searchActive: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: true
        });
      });
  };

  update = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className={css.a}>
        <div
          className={
            this.state.searchActive ? css.searchOpen : css.hide
          }
        >
          <input
            onChange={this.update}
            value={this.state.search_string}
            placeholder="Search..."
            name="search_string"
            className={css.searchInput}
          ></input>
          <img
            src={search_icon_image}
            className={css.searchIcon}
            alt=""
            onClick={this.search}
          />
          <div
            className={
              this.state.additional_show ? css.additionalShow : css.hide
            }
          >
            <Switch
              name="manhattan"
              value={this.state.manhattan}
              onChange={this.state.update}
              label="Manhattan"
            />
            <Switch
              name="brooklyn"
              value={this.state.brooklyn}
              onChange={this.state.update}
              label="Brooklyn"
            />
            <Switch
              name="queens"
              value={this.state.queens}
              onChange={this.state.update}
              label="Queens"
            />
            <Switch
              name="bronx"
              value={this.state.bronx}
              onChange={this.state.update}
              label="Bronx"
            />
            <Switch
              name="staten_island"
              value={this.state.staten_island}
              onChange={this.state.update}
              label="Staten Island"
            />
          </div>
          <div className={css.dropdownWrapper}>
          <div className={css.dropdwon}></div>
          </div>
        </div>
      </div>
    );
  }
}
