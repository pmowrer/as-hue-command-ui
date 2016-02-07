import React, {Component} from 'react';
import {connect}          from 'react-redux';
import attachFastClick    from 'fastclick';
import {
  getAllLights,
  toggleLight
}                         from '../actions';

const ICONS = {
  LCT001: 'a19',
  LCT002: 'br30',
  LCT003: 'gu10',
  LLC001: 'lc_iris',
  LST001: 'lightstrip'
};

class App extends Component {
  constructor(props) {
    super(props);

    // Enable `fastclick` to eliminate 300ms tap delay on mobile.
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        attachFastClick.attach(document.body);
      }, false);
    }
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
    const styles = this.constructor.styles;

    return (
      <ul>
        {lights
          .filter(light => light.state.reachable)
          // Create a copy since sort doesn't return a new array.
          .concat()
          .sort((a, b ) => {
            [a, b] = [a.name, b.name];
            return a > b ? 1 : (a < b ? -1 : 0);
          })
          .map((light, i) =>
            <li key={i}>
              <div style={styles.lightIcon(light.modelid)}></div>
              <span>{light.name}</span>
              <button style={styles.toggleButton}
                      onClick={this.toggle.bind(this, light)}>
                {light.state.on ? 'ON' : 'OFF'}
              </button>
            </li>
          )}
      </ul>
    );
  }
}

App.styles = {
  toggleButton: {
    marginLeft: '20px',
    width: '40px',
    height: '40px'
  },

  lightIcon(modelid) {
    return {
      backgroundImage: `url('img/${ICONS[modelid]}_outline.svg')`,
      width: '25px',
      height: '25px',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      display: 'inline-block'
    };
  }
};

function mapStateToProps(state) {
  const {lights} = state;

  return {
    lights
  };
}

export default connect(mapStateToProps)(App);
