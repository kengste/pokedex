import React, { Component } from 'react';

export default class PokemonDetails extends Component {
  handleHover = (event) => {
    this.props.onChange(event);
  };
  render() {
    return (
      <div className="pokemonDetails" onClick={this.handleHover}>

        <img src={this.props.image} alt={this.props.alt}/>
        <div>

          <h2>{`${this.props.id}. ${this.props.name}`}<img src={this.props.sprite} alt={this.props.alt} /></h2>

          <h5>{`Type: ${this.props.type}`}</h5>
          <h6>{`Attack: ${this.props.attack}`}</h6>
          <h6>{`Defense: ${this.props.defense}`}</h6>
          <h6>{`HP: ${this.props.hp}`}</h6>
          <h6>{`Sp.Atk: ${this.props.spAtk}`}</h6>
          <h6>{`Sp.Def: ${this.props.spDef}`}</h6>
          <h6>{`Speed: ${this.props.speed}`}</h6>

          <br />
        </div>
      </div>
    )}
}
