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
      additional_show: false,
      more_options: false
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

  toggleMoreOptions = () => {
    const ps = this.state.more_options;
    this.setState({
      more_options: !ps
    });
  };

  render() {
    return (
      <div className={css.a}>
        <div className={this.state.searchActive ? css.searchOpen : css.hide}>
          <div
            className={
              this.state.more_options
                ? css.additionalShowSearch
                : css.searchWrapper
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
          </div>
          <div
            className={this.state.more_options ? css.additionalShow : css.hide}
          >
            <div className={css.optionsBlock}>
              <div>Borough Selection: </div>
              <Switch
                name="manhattan"
                value={this.state.manhattan}
                onChange={this.update}
                label="Manhattan"
              />
              <Switch
                name="brooklyn"
                value={this.state.brooklyn}
                onChange={this.update}
                label="Brooklyn"
              />
              <Switch
                name="queens"
                value={this.state.queens}
                onChange={this.update}
                label="Queens"
              />
              <Switch
                name="bronx"
                value={this.state.bronx}
                onChange={this.update}
                label="Bronx"
              />
              <Switch
                name="staten_island"
                value={this.state.staten_island}
                onChange={this.update}
                label="Staten Island"
              />
            </div>
            <div>
              <div>Rating Selection:</div>
              <Switch
                name="rating_a"
                value={this.state.rating_a}
                onChange={this.update}
                label="A"
              />
              <Switch
                name="rating_b"
                value={this.state.rating_b}
                onChange={this.update}
                label="B"
              />
              <Switch
                name="rating_c"
                value={this.state.rating_c}
                onChange={this.update}
                label="C"
              />
              <Switch
                name="rating_pending"
                value={this.state.rating_pending}
                onChange={this.update}
                label="Pending"
              />
              <Switch
                name="rating_closed"
                value={this.state.rating_closed}
                onChange={this.update}
                label="Closed"
              />
            </div>
          </div>
          <div></div>
          <div
            className={this.state.more_options ? css.hide : css.dropdownWrapper}
            onClick={this.toggleMoreOptions}
          >
            <div className={css.dropdownInnerWrapper}>
              <div className={css.dropdown}></div>
            </div>
          </div>
          <div
            className={this.state.more_options ? css.dropdownWrapper : css.hide}
            onClick={this.toggleMoreOptions}
          >
            <div className={css.dropdownInnerWrapper}>
              <div className={css.dropup}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
