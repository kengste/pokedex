import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      displayedData: [],
      value: '',
    }
  }
  async componentDidMount() {
    let data = await (await fetch(`${process.env.PUBLIC_URL}/data/pokedex.json`)).json();
    const displayedData = data;
    let types_data = await (await fetch(`${process.env.PUBLIC_URL}/data/types.json`)).json();
    this.setState({types_data, data, displayedData});
  }
  handleChange = (event) => {
    this.setState({value: event.target.value});
    this.filterByName(this.state.data, event.target.value);
  }
  get_pokemon_types = (obj, types) => {
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
            <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
        </div>
        <div className="App-intro">
          {
            this.state.displayedData.map((item) =>
              <div key={item.id} className="child">
                <span>{this.get_pokemon_types(this.state.types_data, item.type)}</span>
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
