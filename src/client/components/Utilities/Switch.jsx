import React, { Component } from "react";
import css from "./Switch.css";

export default class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: typeof props.value === "boolean" ? props.value : false
    };
  }

  onChangeBehavior = () => {
    let pv = this.state.value;
    if (pv) {
      this.props.onChange({
        target: {
          name: this.props.name,
          value: false
        }
      });
      this.setState({
        value: false
      });
    } else {
      this.props.onChange({
        target: {
          name: this.props.name,
          value: true
        }
      });
      this.setState({
        value: true
      });
    }
  };

  render() {
    return (
      <div className={css.row}>
        <div className={css.switch} onClick={this.onChangeBehavior}>
          <input
            type="checkbox"
            checked={this.state.value}
            onChange={this.onChangeBehavior}
          />
          <span className={css.slider}></span>
        </div>
        <div className={css.label} onClick={this.onChangeBehavior}>{this.props.label}</div>
      </div>
    );
  }
}
