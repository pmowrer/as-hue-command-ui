import _ from 'lodash';

export default lights;

function lights(state = {
  lights: []
}, action) {
  let lights;

  switch (action.type) {
    case 'receiveAllLights':
      lights = action.lights;
      return Object.assign({}, state, {
        lights: Object.keys(lights).map(key => lights[key])
      });
    case 'receiveLightStateUpdate':
      let index = state.lights.findIndex(light => light.id === action.id);
      return Object.assign({}, state, {
        lights: []
          .concat(state.lights.slice(0, index))
          .concat(_.merge({}, state.lights[index], action.light))
          .concat(state.lights.slice(index + 1))
      });

    default:
      return state;
  }
}
