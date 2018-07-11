import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class DefinitionDisplay extends Component {

  render() {
    return (
      <li className="definition">
        {this.props.definition}
      </li>
    );
  }
}

export default DefinitionDisplay;

DefinitionDisplay.propTypes = {
	definition: PropTypes.string
}