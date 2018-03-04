import React, { Component } from 'react';

export default class NameButton extends Component {
  constructor() {
    super();
    this.state = {
      nameAscOrder: false,
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
        <button onClick={this.handleClick}>{(this.state.nameAscOrder) ? 'Change to DESC' : 'Change to ASC'}</button>
      </span>
    )}
}
