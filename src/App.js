import React, { Component } from 'react';
import './App.css';
import DefinitionDisplay from './components/DefinitionDisplay';

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      definition: []
    }
  }


  componentDidMount() {
    this.getDefinitions('');
  }


  handleInput = (e) => {
    const text = e.target.value;
    this.getDefinitions(text);
  };


  getDefinitions(text) {
    this.parseData(text)
      .then(data => data.json())
      .then(fetchedData => {
        if (text !== this.state.input) {
          return;
        }
        else if (fetchedData.result_type.normalize() === "no_results") {
          this.setState({ definition: ["No results found."] });
          return;
        }

        this.setState({ definition: fetchedData.list.map((obj) => obj.definition) });
    });
  }

  parseData(phrase) {
    this.setState({ input: phrase });
    return fetch(`http://api.urbandictionary.com/v0/define?term=${phrase}`);
  }  

  render() {
    const listDefinitions = this.state.definition.map((def, index) => {
            return <DefinitionDisplay key={index} definition={def} />; 
          });
    return (
      <div>
        <input className="input-text" type="text" onChange={this.handleInput} placeholder="Enter phrase.." />
        <ul className="definition_container">
          {this.state.definition.length ? listDefinitions : <h3>Loading..</h3>}
        </ul>
      </div>
    );
  }
}

export default App;
