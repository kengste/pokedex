import React, { Component } from 'react';
import CheckboxField from './Checkbox';
import NameButton from './NameButton';
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
    }
  }
  async componentDidMount() {
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
  handleNameOrderChange = (event, nameAscOrder) => {
    // nameAscOrder ?
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
            <div>
                <label>
                  Name: <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <NameButton onChange={this.handleNameOrderChange} />
                <br />
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
              <div key={item.id} className="child">
                <span>{this.getPokemonTypes(this.state.types_data, item.type)}</span>
                <br />
                <span>{item.ename}</span>
                <br />
                <span>{item.id}</span>
                <br />
                <img src={`${process.env.PUBLIC_URL}/images/img/${item.id + (item.flatName || item.ename)}.png`} alt={`${item.ename}`}/>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
