import React, { Component } from 'react';

export default class Pokemon extends Component {
  handleHover = (event) => {
    this.props.onChange(event, this.props.id);
  };
  render() {
    return (
      <div className="child" onClick={this.handleHover}>
        <span>{this.props.id}.{this.props.name}</span>
        <br />
        <img src={this.props.image} alt={this.props.name}/>
      </div>
    )}
}
