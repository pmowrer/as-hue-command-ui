import {connect} from 'as-hue-command';
const hue = connect();

function receiveAllLights(data) {
  return {
    type: 'receiveAllLights',
    lights: data
  };
}

function receiveLightStateUpdate(name, id, data) {
  return {
    type: 'receiveLightStateUpdate',
    id,
    light: {
      state: {
        [name]: data
      }
    }
  };
}

export function getAllLights() {
  return dispatch => {
    return hue.lights.all().value
      .subscribe(data => dispatch(receiveAllLights(data)));
  };
}

export function toggleLight({id, value}) {
  return dispatch => {
    return hue.lights.get(id).toggle(value)
      .subscribe(data => dispatch(receiveLightStateUpdate('on', id, data)));
  };
}
