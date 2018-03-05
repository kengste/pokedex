import React, { Component } from 'react';
import CheckboxField from './Checkbox';
import Button from './Button';
import Pokemon from './Pokemon';
import PokemonDetails from './PokemonDetails';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      displayedData: [],
      value: '',
      isChecked: true,
      types_data: [],
      displayedTypes: {},
      pokemonNameOrder: null,
      expand: '',
      loading: true,
    }
  }
  async componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500);
    let data = await (await fetch(`${process.env.PUBLIC_URL}/data/pokedex.json`)).json();
    const displayedData = data;
    let types_data = await (await fetch(`${process.env.PUBLIC_URL}/data/types.json`)).json();
    const displayedTypes = {};
    for (let type of types_data) {
      displayedTypes[type['cname']] = true;
    }
    this.setState({types_data, data, displayedData, displayedTypes});
  }
  handleChange = (event) => {
    this.setState({value: event.target.value});
    this.filterByName(this.state.data, event.target.value);
  }
  getPokemonTypes = (obj, types) => {
    const results = [];
    for (let type of types) {
      for (let k in obj) {
        if (!obj.hasOwnProperty(k)) continue;
        if (obj[k]['cname'] === type) {
          results.push(obj[k]['ename']);
          break;
        }
      }
    }
    return results.join(', ');
  }
  filterByName = (list, name = '') => {
    if (name === '') return this.setState({displayedData: this.state.data});
    const displayedData = [];
    for (let element of list) {
      if (element['ename'].toLowerCase().includes(name.toLowerCase())) displayedData.push(element);
    }
    this.setState({displayedData});
  }
  handleCheckbox = (event, isChecked, value) => {
    const displayedData = [];
    const arrayOfTypes = this.state.displayedTypes;
    arrayOfTypes[value] = isChecked;
    this.setState({displayedTypes: arrayOfTypes});
    for (let pokemon of this.state.data) {
      let checkPokemonType = null;
      let check = false;
      for (let type of pokemon['type']) {
        for (let el in arrayOfTypes) {
          if (arrayOfTypes[el] && el === type) {
            check = true;
            break;
          }
          check = false;
        }
        if (check && checkPokemonType === null) {
          checkPokemonType = true;
        } else if (check && checkPokemonType) {
          checkPokemonType = true;
        } else {
          checkPokemonType = false;
        }
      }
      if (checkPokemonType) {
        displayedData.push(pokemon);
      }
    }
    this.setState({displayedData});
  }
  handleIdOrderChange = (event, nameAscOrder) => {
    const displayedData = this.state.displayedData;
    if(nameAscOrder) {
      displayedData.sort(function(a, b) {
        return a.id.localeCompare(b.id);
      });
    } else {
      displayedData.sort(function(b, a) {
        return a.id.localeCompare(b.id);
      });
    }
    this.setState({displayedData});
  }
  handleNameOrderChange = (event, nameAscOrder) => {
    const displayedData = this.state.displayedData;
    if(nameAscOrder) {
      displayedData.sort(function(a, b) {
        return a.ename.localeCompare(b.ename);
      });
    } else {
      displayedData.sort(function(b, a) {
        return a.ename.localeCompare(b.ename);
      });
    }
    this.setState({displayedData});
  }
  handleHover = (event, pokemonId) => {
    this.setState({expand: pokemonId});
  }
  handleHoverExit = (event, pokemonId) => {
    this.setState({expand: ''});
  }
  render() {
    if(this.state.loading) {
      return null;
    }
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <label>
              Search By Name: <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br /><br />
          <Button onChange={this.handleNameOrderChange} title="Pokemon Names" />
          <br /><br />
          <Button onChange={this.handleIdOrderChange} title="Pokemon Ids" />
          <br /><br />
          <label>
            {this.state.types_data.map((type) =>
              <CheckboxField key={type.cname} label={type.ename} category={type.cname} onChange={this.handleCheckbox} />
            )}
          </label>
        </div>
      </header>
      <div className="App-intro">
        {
          this.state.displayedData.map((item) =>
          this.state.expand !== item.id
          ? <Pokemon key={item.id} id={item.id} name={item.ename} type={this.getPokemonTypes(this.state.types_data, item.type)} image={`${process.env.PUBLIC_URL}/images/img/${item.id + (item.flatName || item.ename)}.png`} onChange={this.handleHover} />
        : <PokemonDetails
        key={item.id}
        id={item.id}
        name={item.ename}
        type={this.getPokemonTypes(this.state.types_data, item.type)}
        image={`${process.env.PUBLIC_URL}/images/img/${item.id + (item.flatName || item.ename)}.png`}
        sprite={`${process.env.PUBLIC_URL}/images/spr/${item.id}MS.png`}
        onChange={this.handleHoverExit}
        attack={item.base['Attack']}
        defense={item.base['Defense']}
        hp={item.base['HP']}
        spAtk={item.base['Sp.Atk']}
        spDef={item.base['Sp.Def']}
        speed={item.base['Speed']}
        />
    )
  }
</div>
</div>
);
}
}

export default App;
