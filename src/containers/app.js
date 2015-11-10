import React, {Component} from 'react';
import {connect}          from 'react-redux';
import {
  getAllLights,
  toggleLight
}                         from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getAllLights());
  }

  toggle(light) {
    const {dispatch} = this.props;
    dispatch(toggleLight({
      id: light.id,
      value: !light.state.on
    }));
  }

  render() {
    const {lights} = this.props;

    return (
      <ul>
        {lights.map((light, i) =>
          <li key={i}>
            <span>{light.name}</span>
            <button onClick={this.toggle.bind(this, light)}>
              {light.state.on ? 'ON' : 'OFF'}
            </button>
          </li>
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
