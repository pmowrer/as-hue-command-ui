import ashue from 'as-hue-command';

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
    return ashue.lights.all().value
      .subscribe(data => dispatch(receiveAllLights(data)));
  };
}

export function toggleLight({id, value}) {
  return dispatch => {
    return ashue.lights.get(id).toggle(value)
      .subscribe(data => dispatch(receiveLightStateUpdate('on', id, data)));
  };
}
