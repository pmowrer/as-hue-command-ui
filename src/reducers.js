export default lights;

function lights(state = {
  lights: []
}, action) {
  switch (action.type) {
    case 'receiveAllLights':
      lights = action.lights;
      return Object.assign({}, state, {
        lights: Object.keys(lights).map(key => lights[key])
      });
    default:
      return state;
  }
}
