import React, { Component } from 'react';

export default class CheckboxField extends Component {
  constructor() {
    super();
    this.state = {
      checked: true,
    }
  }

  handleCheck = (event, isInputChecked) => {
    const checked = !this.state.checked;
    this.setState({checked});
    this.props.onChange(event, checked, this.props.category);
  };

  render() {
    return (
      <span>
          <input type="checkbox"
            label={this.props.label}
            value={this.props.label}
            checked={this.state.checked}
            onChange={this.handleCheck}
          />
          {this.props.label}
      </span>
    )}
}
