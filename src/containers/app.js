import React, {Component} from 'react';
import {connect}          from 'react-redux';
import {getAllLights}     from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getAllLights());
  }

  render() {
    const {lights} = this.props;

    return (
      <ul>
        {lights.map((light, i) =>
          <li key={i}>{light.name}</li>
        )}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  const {lights} = state;

  return {
    lights
  };
}

export default connect(mapStateToProps)(App);
