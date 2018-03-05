import React, { Component } from 'react';

export default class Button extends Component {
  constructor() {
    super();
    this.state = {
      nameAscOrder: true,
    }
  }

  handleClick = (event) => {
    const nameAscOrder = !this.state.nameAscOrder;
    this.setState({nameAscOrder});
    this.props.onChange(event, nameAscOrder);
  };

  render() {
    return (
      <span>
        <button onClick={this.handleClick}>{(this.state.nameAscOrder) ? `Sort by ${this.props.title} DESC` : `Sort by ${this.props.title} ASC`}</button>
      </span>
    )}
}
